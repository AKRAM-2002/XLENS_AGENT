'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, Loader2, Upload, Image } from 'lucide-react';
import type { TweetAnalysis } from '@/services/api/types';

function FactChecker() {
  const [inputType, setInputType] = useState<"text" | "url" | "image">("text");
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [includeComments, setIncludeComments] = useState(false);
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
    // const formData = new FormData();
    
    // if (inputType === "image" && image) {
    //   formData.append("image", image);
    //   formData.append("includeComments", String(includeComments));
    // } else if (inputType === "url") {
    //   formData.append("url", input);
    //   formData.append("includeComments", String(includeComments));
    // } else if (inputType === "text") {
    //   formData.append("text", input);
    //   formData.append("includeComments", String(includeComments));
    // }
    
    // try {
    //   const response = await axios.post('http://localhost:8000/api/v1/tweets/analyze', formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   setResult(response.data.Fact_description);
    // } catch (error) {
    //   console.error("Error during fact-checking:", error);
    //   setResult(error.response?.data?.error || "An error occurred. Please try again.");
    // }
    
    // setLoading(false);

    try {
      // let analysis: TweetAnalysis;
      
      // if (inputType === "image" && image) {
      //   analysis = await tweetService.uploadTweetImage(image);
      // } else {
      //   analysis = await tweetService.analyzeTweet(input);
      // }
      const response = await axios.post('http://localhost:8000/api/fact-check', { tweet_text: input });
      setResult(response.data);
      // setResult(analysis);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while fact-checking the tweet');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-xl p-3 bg-gradient-to-r from-green-600 to-emerald-500 mb-4">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fact Checker</h1>
          <p className="text-gray-600">
            Verify the accuracy of any tweet, including images and comments
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
              {[
                { type: "text", label: "Paste Tweet" },
                { type: "url", label: "Paste URL" },
                { type: "image", label: "Upload Image" }
              ].map((option, idx) => (
                <button
                  key={option.type}
                  onClick={() => setInputType(option.type as "text" | "url" | "image")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    inputType === option.type
                      ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              {inputType === "text" && (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste the tweet text here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow bg-white"
                  required
                />
              )}
              {inputType === "url" && (
                <input
                  type="url"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste the tweet URL here..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow bg-white"
                  required
                />
              )}
              {inputType === "image" && (
                <div className="flex flex-col items-center">
                  <label className="w-full cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {image && (
                    <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Preview"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {inputType === "url" && (
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                <input
                  type="checkbox"
                  id="includeComments"
                  checked={includeComments}
                  onChange={(e) => setIncludeComments(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                />
                <label htmlFor="includeComments" className="text-gray-700 cursor-pointer">
                  Include comments in analysis
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Checking Facts...
                </>
              ) : (
                'Check Facts'
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-4">
              <p>{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-blue-600 hover:underline"
              >
                Try Again
              </button>
            </div>
          )}

          {result && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Fact Check Results:</h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p><strong>Accuracy Score:</strong> {result.accuracy_score}</p>
                  <p><strong>Verified Claims:</strong> {result.verified_claims.join(', ')}</p>
                  <p><strong>Unverified Claims:</strong> {result.unverified_claims.join(', ')}</p>
                  <div>
                    <strong>Evidence:</strong>
                    <ul>
                      {Object.entries(result.evidence).map(([claim, evidence], index) => (
                        <li key={index}>{claim}: {evidence}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default FactChecker;