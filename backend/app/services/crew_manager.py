# backend/app/services/crew_manager.py
from crewai import Agent, Task, Crew, Process
from langchain_community.llms import Ollama
from typing import Dict
from app.core.settings import get_settings

settings = get_settings()

class TruthTerminalCrew:
    def __init__(self):
        self.llm = Ollama(
            base_url=settings.OLLAMA_BASE_URL,
            model=settings.OLLAMA_MODEL
        )
        
        self.fact_checker = Agent(
            role='Fact Checker',
            goal='Thoroughly verify the accuracy of tweet claims',
            backstory="""You are an expert fact checker with years of experience 
            in digital journalism and social media verification.""",
            llm=self.llm,
            verbose=True
        )
        
        self.sentiment_analyzer = Agent(
            role='Sentiment Analyzer',
            goal='Analyze the emotional tone and impact of tweets',
            backstory="""You are an expert in sentiment analysis and emotional 
            intelligence, specializing in social media content.""",
            llm=self.llm,
            verbose=True
        )
        
        self.content_strategist = Agent(
            role='Viral Content Strategist',
            goal='Generate engaging viral tweet content',
            backstory="""You are a social media expert who understands what makes 
            content go viral.""",
            llm=self.llm,
            verbose=True
        )

    async def analyze_tweet(self, tweet_text: str) -> Dict:
        fact_check_task = Task(
            description=f"""Analyze this tweet for factual accuracy:
            '{tweet_text}'
            
            1. Identify all factual claims
            2. Verify each claim
            3. Rate accuracy on a scale of 1-10
            4. Provide evidence for your conclusions
            5. Return results as a structured dictionary
            """,
            agent=self.fact_checker
        )

        sentiment_task = Task(
            description=f"""Analyze the sentiment of this tweet:
            '{tweet_text}'
            
            1. Determine overall emotional tone
            2. Identify emotional triggers
            3. Assess potential audience impact
            4. Rate sentiment on scale (-1 to 1)
            5. Return results as a structured dictionary
            """,
            agent=self.sentiment_analyzer
        )

        crew = Crew(
            agents=[self.fact_checker, self.sentiment_analyzer],
            tasks=[fact_check_task, sentiment_task],
            verbose=2,
            process=Process.sequential
        )

        result = await crew.kickoff()
        return self._parse_analysis_result(result)

    async def generate_viral_tweet(self, topic: str, tone: str, target_audience: str) -> Dict:
        generation_task = Task(
            description=f"""Generate a viral tweet about {topic}:
            
            Parameters:
            - Topic: {topic}
            - Desired tone: {tone}
            - Target audience: {target_audience}
            
            Requirements:
            1. Must be engaging and shareable
            2. Maintain authenticity
            3. Include relevant hashtags
            4. Stay within Twitter's character limit
            5. Consider audience psychology
            
            Return the tweet and engagement metrics prediction.
            """,
            agent=self.content_strategist
        )

        crew = Crew(
            agents=[self.content_strategist],
            tasks=[generation_task],
            verbose=2
        )

        result = await crew.kickoff()
        return self._parse_generation_result(result)

    def _parse_analysis_result(self, result: str) -> Dict:
        # Add parsing logic here
        return {
            "fact_check": {
                "accuracy_score": 8.5,
                "verified_claims": [],
                "unverified_claims": [],
                "evidence": {}
            },
            "sentiment": {
                "score": 0.75,
                "tone": "positive",
                "emotional_triggers": [],
                "potential_impact": ""
            }
        }

    def _parse_generation_result(self, result: str) -> Dict:
        # Add parsing logic here
        return {
            "tweet": result.strip(),
            "metrics": {
                "engagement_score": 0.85,
                "viral_potential": 0.75
            }
        }