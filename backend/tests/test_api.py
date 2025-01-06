# backend/tests/test_api.py
import requests
import json

def test_fact_check_endpoint():
    # Test fact-check endpoint
    fact_check_response = requests.post(
        "http://localhost:8000/api/fact-check", 
        json={"tweet_text": "The AI is the future."}
    )
    print("\n=== Fact Check Results ===")
    try:
        result = fact_check_response.json()
        print(result)
        # Check if the response matches the expected schema
        assert 'accuracy_score' in result
        assert 'verified_claims' in result
        assert 'unverified_claims' in result
        assert 'evidence' in result
    except json.JSONDecodeError:
        print("Response is not valid JSON")
    except AssertionError:
        print("Fact check response does not match expected schema")

def test_sentiment_analysis_endpoint():
    # Test sentiment analysis endpoint
    sentiment_response = requests.post(
        "http://localhost:8000/api/sentiment-analysis", 
        json={"tweet_text": "AI has increased productivity by 500% in 2024"}
    )
    print("\n=== Sentiment Analysis Results ===")
    print(sentiment_response.json())

def test_generate_endpoint():
    # Test single tweet generation
    generate_response = requests.post(
        "http://localhost:8000/api/generate",
        json={
            "topic": "Artificial Intelligence",
            "tone": "informative",
            "target_audience": "tech enthusiasts"
        }
    )
    print("\n=== Generated Tweet Results ===")
    print(generate_response.json())

def test_generate_batch_endpoint():
    # Test multiple tweet generation
    batch_response = requests.post(
        "http://localhost:8000/api/generate-batch",
        json={
            "topic": "Artificial Intelligence",
            "tone": "informative",
            "target_audience": "tech enthusiasts"
        },
        params={"count": 3}
    )
    print("\n=== Batch Generated Tweets Results ===")
    print(batch_response.json())

def test_trending_topics():
    # Test trending topics endpoint
    trending_response = requests.get("http://localhost:8000/api/trending-topics")
    print("\n=== Trending Topics Results ===")
    print(trending_response.json())

if __name__ == "__main__":
    try:
        print("Starting API tests...")
        test_fact_check_endpoint()
        # test_sentiment_analysis_endpoint()
        # test_generate_endpoint()
        # test_generate_batch_endpoint()
        # test_trending_topics()
        # print("\nAll tests completed successfully!")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the FastAPI server is running on http://localhost:8000")
    except Exception as e:
        print(f"Error occurred: {str(e)}")