# XLens - AI Enhanced Social Media Analysis

Welcome to **XLens**, a solo project by Akram Boutzouga, designed to revolutionize how we interact with social media content through advanced AI technologies. This project began as a debugging exercise but has evolved into a comprehensive tool for fact-checking, sentiment analysis, and content generation tailored for social media platforms.

## Project Overview

**XLens** was initially conceived to address debugging issues in software development tools but has been transformed into an AI-driven platform that:

- **Fact-Checks** tweets in real-time to verify their accuracy.
- **Analyzes Sentiment** to understand the emotional tone behind social media posts.
- **Generates Viral Content** to help users craft engaging posts.

### Key Features

- **FactChecker**: Instantly verify the accuracy of tweets by cross-referencing with credible sources.
- **Sentiment Analyzer**: Provides insights into the sentiment of any tweet, helping tailor responses or understand public opinion.
- **Viral Tweet Generator**: Utilizes AI to generate tweets with high potential for virality, enhancing user engagement.

## Architecture

- **Frontend**: Built with React.js and Next.js for a responsive and interactive user interface.
- **Backend**: Utilizes FastAPI to handle API requests efficiently.
- **AI Integration**: Powered by the Ollama model for AI functionalities, integrated through CrewAI for task management.
- **Third-Party Services**: Incorporates SerperDevTool for internet search capabilities to support fact-checking.

## Technologies Used

- **Frontend**: React, Next.js, Framer Motion
- **Backend**: Python, FastAPI
- **AI**: Ollama Model, CrewAI
- **Tools**: SerperDevTool

## Development Journey

### Successes

- Successfully integrated AI to perform accurate fact-checking, sentiment analysis, and content generation.
- Developed a user-friendly interface that simplifies interaction with AI functionalities.
- Overcame initial debugging challenges to focus on AI integration.

### Challenges

- **JSON Parsing**: Encountered issues with JSON formatting from AI responses, leading to the development of custom cleaning functions.
- **Error Handling**: Dealt with server errors during AI integration, which required robust error handling solutions.
- **Solo Development**: Managed all aspects of the project alone, which was both challenging and rewarding in terms of learning.

### Areas for Improvement

- Enhance error resilience to handle unexpected AI responses more gracefully.
- Improve backend scalability to support more users and concurrent requests.
- Implement a user feedback system to refine AI models based on real-world usage.

### Lessons Learned

- Gained deep insights into AI integration, particularly the importance of data format consistency.
- Mastered solo project management, from planning to execution, enhancing my problem-solving and time management skills.
- Expanded knowledge in full-stack development, AI model deployment, and the nuances of web application security.

### Next Steps

- Expand features to include real-time trend analysis.
- Refine the AI models with more data to increase accuracy and efficiency.
- Focus on user engagement through enhanced UI/UX and additional interactive features.

## How to Use

1. **Clone the Repository**: `git clone https://github.com/AKRAM-2002/XLENS_AGENT.git`
2. **Install Dependencies**: 
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && pip install -r requirements.txt`
3. **Set Up Environment Variables**: Ensure you have set up necessary API keys and environment variables (e.g., `GEMINI_API_KEY` for the AI model).
4. **Run the Application**:
   - Backend: `cd backend && python main.py`
   - Frontend: `cd frontend && npm run dev`
5. **Access the Application**: Open your browser and go to `localhost:3000` (or the specified port).

## Contributing

This project was developed solo, but contributions or suggestions are welcome. Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is open-sourced under the [MIT License](LICENSE).

---

**Developed by Akram Boutzouga** - Connect with me on [X (formerly Twitter)](https://x.com/akramboutzouga) or explore my other projects on [GitHub](https://github.com/AKRAM-2002).