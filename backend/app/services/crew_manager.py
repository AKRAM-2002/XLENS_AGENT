# backend/app/services/crew_manager.py
from crewai import Agent, Task, Crew
from .ollama_client import OllamaClient
from app.api.models.schemas import (
    AnalysisResponse, 
    GenerationResponse, 
    TrendingTopic,
    FactCheckResult,
    SentimentResult
)
import json
from typing import List
import asyncio, re

class CrewManager:
    def __init__(self):
        self.ollama_client = OllamaClient()
        self.llm = self.ollama_client.get_llm()

    def _create_agents(self):
        fact_check_agent = Agent(
            role="Fact-Checker",
            goal="Verify the claims in a given tweet and provide their accuracy with evidence.",
            backstory="You are a highly accurate fact-checker trained to evaluate statements and provide verified and unverified claims with evidence.",
            llm=self.llm
        )

        sentiment_agent = Agent(
            role="Sentiment Analyzer",
            goal="Analyze the sentiment of the given tweet and provide tone, emotional triggers, and the potential impact.",
            backstory="You are a sentiment analysis expert who accurately identifies the tone and emotional context of statements.",
            llm=self.llm
        )

        content_generator_agent = Agent(
            role="Content Generator",
            goal="Generate engaging and viral tweets based on given parameters.",
            backstory="You are an expert content creator who understands viral content patterns and audience engagement.",
            llm=self.llm
        )

        return fact_check_agent, sentiment_agent, content_generator_agent

    def _create_tasks(self, tweet_text: str, fact_check_agent: Agent, sentiment_agent: Agent):
        fact_check_task = Task(
            description=f'Fact-check the following tweet: "{tweet_text}"',
            expected_output="A JSON object containing accuracy_score, verified_claims, unverified_claims, and evidence.",
            agent=fact_check_agent
        )

        sentiment_task = Task(
            description=f'Analyze the sentiment of the following tweet: "{tweet_text}"',
            expected_output="A JSON object containing score, tone, emotional_triggers, and potential_impact.",
            agent=sentiment_agent
        )

        return fact_check_task, sentiment_task



    def _create_generation_task(self, topic: str, tone: str, target_audience: str, content_generator_agent: Agent):
        return Task(
            description=f'Generate a viral tweet about {topic} with {tone} tone for {target_audience}',
            expected_output="A JSON object containing tweet_text, engagement_score, hashtags, and best_posting_time.",
            agent=content_generator_agent
        )

    def _clean_response(self, response):
        # Function to parse and remove redundancy from the response
        try:
            # Ensure the response is a string if it's not already
            if not isinstance(response, str):
                response = str(response)
            
            # Remove comments from the JSON string
            cleaned_response = re.sub(r'//.*', '', response)
            
            # Remove any extra whitespace and ensure proper JSON formatting
            cleaned_response = re.sub(r'\s+', ' ', cleaned_response).strip()
            
            # Handle the accuracy_score formatting
            # Since null is not a valid float in JSON, we'll convert it to 0.0 or another appropriate value
            cleaned_response = re.sub(r'"accuracy_score":\s*null', '"accuracy_score": 0.0', cleaned_response)

            # Handling the evidence field which should be key-value pairs
            # Assuming the evidence field should have a structure like {"claim": "evidence detail"}
            # This regex will attempt to add a key if one is missing in the evidence field
            evidence_pattern = r'"evidence":\s*(\{([^}]*)\})'
            evidence_match = re.search(evidence_pattern, cleaned_response)
            if evidence_match:
                evidence_content = evidence_match.group(2)
                if not re.search(r'"[^"]*":', evidence_content):
                    # If there's no key in evidence, we add a default key
                    cleaned_response = cleaned_response.replace(
                        evidence_match.group(1),
                        f'{{"general": "{evidence_content.strip().replace('"', '\\"')}"}}'
                    )
            
            # Parse the cleaned JSON string
            parsed = json.loads(cleaned_response)
            return parsed
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"Failed to decode JSON: {cleaned_response}")
            return response  # Return raw response if JSON parsing fails
        except Exception as e:
            print(f"Unexpected error in _clean_response: {e}")
            return response
    
    def fact_check_tweet(self, tweet_text: str) -> FactCheckResult:
        fact_check_agent, _, _ = self._create_agents()
        
        fact_check_task = Task(
            description=f"""Fact-check the following tweet and return a JSON object: "{tweet_text}"
            The JSON must have exactly these fields:
            {{
                "accuracy_score": (float between 0-1),
                "verified_claims": [list of strings],
                "unverified_claims": [list of strings],
                "evidence": {{key: value pairs of claims and evidence}}
            }}""",
            expected_output="""A JSON object containing accuracy_score, verified_claims, unverified_claims, and evidence.""",
            agent=fact_check_agent
        )

        crew = Crew(
            agents=[fact_check_agent],
            tasks=[fact_check_task],
            verbose=True
        )

        result = crew.kickoff()
        print(f"Raw result: {result}")  # Debugging: Print the raw result
            
        try:
            # Use the cleaning function to handle the JSON response
            cleaned_result = self._clean_response(result)
            fact_check = json.loads(json.dumps(cleaned_result))  # Ensure it's a JSON object
            print(f"Parsed result: {fact_check}")  # Debugging: Print parsed result
            return FactCheckResult(**fact_check)
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"Failed to decode JSON: {cleaned_result}")
            raise ValueError(f"Failed to parse fact-check response due to JSON decoding error: {e}")
        except TypeError as e:
            print(f"TypeError in parsing: {e}")
            print(f"Attempted to parse: {cleaned_result}")
            raise ValueError(f"TypeError occurred while creating FactCheckResult: {e}")
        except Exception as e:
            print(f"Unexpected error in fact_check_tweet: {e}")
            raise ValueError(f"An unexpected error occurred: {e}")

    def sentiment_analyze_tweet(self, tweet_text: str) -> SentimentResult:
        _, sentiment_agent = self._create_agents()
        
        sentiment_task = Task(
            description=f"""Analyze the sentiment of the following tweet and return a JSON object: "{tweet_text}"
            The JSON must have exactly these fields:
            {{
                "score": (float between 0-1),
                "tone": (string),
                "emotional_triggers": [list of strings],
                "potential_impact": (string)
            }}""",
            agent=sentiment_agent
        )

        crew = Crew(
            agents=[sentiment_agent],
            tasks=[sentiment_task],
            verbose=True
        )

        result = crew.kickoff()
        
        try:
            sentiment = json.loads(result.split('Final Answer:')[-1].strip())
            return SentimentResult(**sentiment)
        except (ValueError, json.JSONDecodeError):
            raise ValueError("Failed to parse sentiment analysis response")


    def analyze_tweet(self, tweet_text: str) -> AnalysisResponse:
        fact_check_agent, sentiment_agent = self._create_agents()
        
        fact_check_task = Task(
            description=f"""Fact-check the following tweet and return a JSON object: "{tweet_text}"
            The JSON must have exactly these fields:
            {{
                "accuracy_score": (float between 0-1),
                "verified_claims": [list of strings],
                "unverified_claims": [list of strings],
                "evidence": {{key: value pairs of claims and evidence}}
            }}""",
            agent=fact_check_agent
        )

        sentiment_task = Task(
            description=f"""Analyze the sentiment of the following tweet and return a JSON object: "{tweet_text}"
            The JSON must have exactly these fields:
            {{
                "score": (float between 0-1),
                "tone": (string),
                "emotional_triggers": [list of strings],
                "potential_impact": (string)
            }}""",
            agent=sentiment_agent
        )
        

        crew = Crew(
            agents=[fact_check_agent, sentiment_agent],
            tasks=[fact_check_task, sentiment_task],
            verbose=True
        )

        result = crew.kickoff()
        
        # Split the result into fact-checking and sentiment analysis
        try:
            # If we expect only one JSON object per agent, split by agent response
            fact_check_part, sentiment_part = result.split('\n\n')
            fact_check = json.loads(fact_check_part.split('Final Answer:')[-1].strip())
            sentiment = json.loads(sentiment_part.split('Final Answer:')[-1].strip())
            return AnalysisResponse(fact_check=FactCheckResult(**fact_check), sentiment=SentimentResult(**sentiment))
        except ValueError:
            # If the above fails, try parsing the entire result as one JSON object (in case of unexpected format)
            try:
                full_result = json.loads(result)
                return AnalysisResponse(**full_result)
            except json.JSONDecodeError:
                raise ValueError("Failed to parse crew response")

    async def generate_viral_tweet(self, topic: str, tone: str, target_audience: str) -> GenerationResponse:
        _, _, content_generator_agent = self._create_agents()
        generation_task = self._create_generation_task(
            topic, tone, target_audience, content_generator_agent
        )
        
        crew = Crew(
            agents=[content_generator_agent],
            tasks=[generation_task],
            verbose=True
        )
        
        result = crew.kickoff()
        
        try:
        # Clean up the result if it contains comments or unexpected characters
            json_str = self._clean_json_string(result)
            parsed_result = json.loads(json_str)
            return GenerationResponse(**parsed_result)
        except json.JSONDecodeError as e:
            print(f"Error parsing result: {e}")
            raise ValueError("Failed to parse generation response") from e
    
    def _clean_json_string(self, result):
        # Clean up the string to remove comments, extra spaces, etc., before JSON parsing
        if hasattr(result, 'output'):
            json_str = result.output
        else:
            json_str = str(result)
        
        # Remove comments; this is very simplistic and might need adjustments
        json_str = re.sub(r'//.*', '', json_str)
        # Remove extra whitespace and newlines
        json_str = re.sub(r'\s+', ' ', json_str).strip()
        # Ensure double quotes for JSON
        json_str = json_str.replace("'", '"')
        
        return json_str
    async def generate_batch_tweets(self, topic: str, tone: str, target_audience: str, count: int) -> list[GenerationResponse]:
        coroutines = [self.generate_viral_tweet(topic, tone, target_audience) for _ in range(count)]
        results = await asyncio.gather(*coroutines)
        return results