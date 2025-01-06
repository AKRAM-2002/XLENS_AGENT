'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Loader2 } from 'lucide-react';
import { FeatureLayout } from '@/components/FeatureLayout';

// Viral Generator Component
function ViralGenerator() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tweetStatus, setTweetStatus] = useState({});
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    console.log("Fetching trending topics...");
    try {
      const response = await axios.get('http://localhost:8000/trending-topics');
      setTrendingTopics(response.data);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    }
  };

  const generateThread = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/generate-batch', {
        topic: "Artificial Intelligence",
        tone: "informative",
        target_audience: "tech enthusiasts"
      }, {
        params: { count: 3 }
      });
      console.log('Received data:', response.data);
      setResult(response.data.tweets);
    } catch (error) {
      console.error('Error:', error);
      setResult([]);
    }
    setLoading(false);
  };

  const handleTweet = async (tweetContent, index) => {
    try {
      setTweetStatus(prev => ({ ...prev, [index]: 'sending' }));
      const response = await axios.post('http://localhost:8000/tweet', { tweet: tweetContent });
      console.log('Tweet response:', response.data);
      setTweetStatus(prev => ({ 
        ...prev, 
        [index]: response.data.message || 'Success!'
      }));
      setTimeout(() => {
        setTweetStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[index];
          return newStatus;
        });
      }, 3000);
    } catch (error) {
      console.error('Tweet error:', error);
      setTweetStatus(prev => ({ 
        ...prev, 
        [index]: error.response?.data?.detail || 'Failed to tweet'
      }));
    }
  };

  return (
    <FeatureLayout
      icon={<Sparkles />}
      title="Viral Tweet Generator"
      description="Create engaging tweets that go viral"
      gradient="from-purple-600 to-pink-500"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl mb-4 font-semibold">Trending Topics</h2>
        {trendingTopics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-600">{topic.topic}</p>
                <p className="text-xs text-gray-500">Engagement Score: {topic.engagement_score}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={generateThread}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-8 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Generating Tweets...
            </>
          ) : (
            'Generate Viral Thread'
          )}
        </button>
      </div>

      {result.length > 0 && (
        <div className="mt-8 space-y-4">
          {result.map((tweet, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white">
                    <span className="font-semibold">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg mb-3">{tweet.tweet_text}</p>
                  <div className="text-sm text-gray-500">
                    <p>Engagement Score: {tweet.engagement_score}</p>
                    <p>Hashtags: {tweet.hashtags.join(", ")}</p>
                    <p>Best Posting Time: {tweet.best_posting_time}</p>
                  </div>
                  <div className="flex items-center gap-6 mt-3">
                    <button className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                      <span>❤</span>
                      <span>Like</span>
                    </button>
                    <button 
                      onClick={() => handleTweet(tweet.tweet_text, index)}
                      className="flex items-center gap-2 hover:text-purple-500 transition-colors"
                      disabled={tweetStatus[index] === 'sending'}
                    >
                      <span>↺</span>
                      <span>
                        {tweetStatus[index] === 'sending' ? 'Sending...' : 'Tweet'}
                      </span>
                    </button>
                    {tweetStatus[index] && tweetStatus[index] !== 'sending' && (
                      <span className={`text-sm ${
                        tweetStatus[index].includes('Success') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tweetStatus[index]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        {result.length === 0 && !loading && <p className="text-red-500">Failed to generate tweets. Please try again.</p>}
      </div>
    </FeatureLayout>
  );
}
export default ViralGenerator;