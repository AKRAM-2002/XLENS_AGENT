# backend/tests/test_api.py
import requests

def test_analyze_endpoint():
    # Test tweet analysis
    analyze_response = requests.post(
        "http://localhost:8000/analyze", 
        json={"tweet_text": "AI has increased productivity by 500% in 2024"}
    )
    print("\n=== Tweet Analysis Results ===")
    print(analyze_response.json())

def test_generate_endpoint():
    # Test single tweet generation
    generate_response = requests.post(
        "http://localhost:8000/generate",
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
        "http://localhost:8000/generate-batch",
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
    trending_response = requests.get("http://localhost:8000/trending-topics")
    print("\n=== Trending Topics Results ===")
    print(trending_response.json())

if __name__ == "__main__":
    try:
        print("Starting API tests...")
        test_analyze_endpoint()
        test_generate_endpoint()
        test_generate_batch_endpoint()
        test_trending_topics()
        print("\nAll tests completed successfully!")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the FastAPI server is running on http://localhost:8000")
    except Exception as e:
        print(f"Error occurred: {str(e)}")