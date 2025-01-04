# backend/app/services/crew_manager.py
from crewai import Agent, Task, Crew
from .ollama_client import OllamaClient
from app.api.models.schemas import (
    AnalysisResponse, 
    GenerationResponse, 
    TrendingTopic
)
import json

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
        
        try:
            parsed_result = json.loads(result)
            return AnalysisResponse(**parsed_result)
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
                parsed_result = json.loads(result)
                return GenerationResponse(**parsed_result)
            except json.JSONDecodeError:
                raise ValueError("Failed to parse generation response")
    