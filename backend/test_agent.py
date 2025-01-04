from crewai import Agent, Task, Crew, LLM

# Initialize the Ollama LLM
llm = LLM(model="ollama/phi3:3.8b")

# Create the Fact-Checking Agent
fact_check_agent = Agent(
    role="Fact-Checker",
    goal="""Verify the claims in a given tweet and provide their accuracy with evidence.""",
    backstory="""You are a highly accurate fact-checker trained to evaluate statements and provide verified and unverified claims with evidence.""",
    llm=llm
)

# Create the Sentiment Analysis Agent
sentiment_agent = Agent(
    role="Sentiment Analyzer",
    goal="""Analyze the sentiment of the given tweet and provide tone, emotional triggers, and the potential impact.""",
    backstory="""You are a sentiment analysis expert who accurately identifies the tone and emotional context of statements.""",
    llm=llm
)

# Define the task to analyze the tweet
tweet_text = "AI has increased productivity by 500% in 2024"
fact_check_task = Task(
    description=f"""Fact-check the following tweet: "{tweet_text}" """,
    expected_output="""A JSON object containing accuracy_score, verified_claims, unverified_claims, and evidence.""",
    agent=fact_check_agent
)

sentiment_task = Task(
    description=f"""Analyze the sentiment of the following tweet: "{tweet_text}" """,
    expected_output="""A JSON object containing score, tone, emotional_triggers, and potential_impact.""",
    agent=sentiment_agent
)

# Initialize the Crew with both agents and tasks
crew = Crew(
    agents=[fact_check_agent, sentiment_agent],
    tasks=[fact_check_task, sentiment_task],
    verbose=True
)

# Execute the tasks
result = crew.kickoff()

# Print the results
print(result)
