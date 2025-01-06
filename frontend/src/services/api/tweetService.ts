import axios from 'axios';
import { API_BASE_URL } from './config';
import { TweetAnalysis, GeneratedTweet } from './types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.detail || 'An unexpected error occurred',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export const tweetService = {
  async analyzeTweet(text: string): Promise<TweetAnalysis> {
    const response = await api.post('/analyze', { tweet_text: text });
    return response.data;
  },

  async analyzeSentiment(text: string): Promise<TweetAnalysis['sentiment']> {
    const response = await api.post('/analyze', { tweet_text: text });
    return response.data.sentiment;
  },

  async generateTweet(params: {
    topic: string;
    tone: string;
    target_audience: string;
  }): Promise<GeneratedTweet> {
    const response = await api.post('/generate', params);
    return response.data;
  },

  async uploadTweetImage(file: File): Promise<TweetAnalysis> {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};