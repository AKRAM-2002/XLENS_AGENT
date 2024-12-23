'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, Loader2 } from 'lucide-react';
import { FeatureLayout } from '@/components/FeatureLayout';

// Sentiment Analyzer Component
function SentimentAnalyzer() {
  const [tweet, setTweet] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/sentiment', { tweet });
      setResult(response.data.sentiment_description);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error analyzing sentiment. Please try again.');
    }
    setLoading(false);
  };

  return (
    <FeatureLayout
      icon={<MessageSquare />}
      title="Sentiment Analyzer"
      description="Understand the emotional tone of any tweet"
      gradient="from-blue-600 to-indigo-500"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="Enter the tweet to analyze..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Analyzing Sentiment...
              </>
            ) : (
              'Analyze Sentiment'
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results:</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
            </div>
          </div>
        )}
      </div>
    </FeatureLayout>
  );
}

export default SentimentAnalyzer;