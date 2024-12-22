'use client'

import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, Upload, Image } from "lucide-react";

function FactChecker() {
  const [inputType, setInputType] = useState<"text" | "url" | "image">("text");
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [includeComments, setIncludeComments] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
  
    if (inputType === "image" && image) {
      // Send uploaded image to the backend
      formData.append("image", image);
      formData.append("includeComments", String(includeComments));
    } else if (inputType === "url") {
      // Send the URL for fetching metadata and comments
      formData.append("url", input);
      formData.append("includeComments", String(includeComments));
    } else if (inputType === "text") {
      // Send plain text for basic analysis
      formData.append("text", input);
      formData.append("includeComments", String(includeComments));
    }
  
    try {
      const endpoint = "http://localhost:8000/facts";
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setResult(response.data.Fact_description);
    } catch (error) {
      console.error("Error during fact-checking:", error);
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        setResult(`Error: ${error.response.data.error || "Something went wrong"}`);
      } else {
        setResult("An error occurred. Please try again.");
      }
    }
    
  
    setLoading(false);
  };
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fact Checker</h1>
        <p className="text-gray-600">
          Verify the accuracy of any tweet, including images and comments.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setInputType("text")}
          className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
            inputType === "text"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Paste Tweet
        </button>
        <button
          onClick={() => setInputType("url")}
          className={`px-4 py-2 font-medium transition-colors ${
            inputType === "url"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Paste URL
        </button>
        <button
          onClick={() => setInputType("image")}
          className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
            inputType === "image"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Upload Image
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {inputType === "text" && (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the tweet text here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          )}
          {inputType === "url" && (
            <input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the tweet URL here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          )}
          {inputType === "image" && (
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              {image && (
                <div className="border border-gray-300 rounded-lg overflow-hidden">
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

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="includeComments"
            checked={includeComments}
            onChange={(e) => setIncludeComments(e.target.checked)}
            disabled={inputType === "image" || inputType === "text"} // Disable for unsupported types
            className="cursor-pointer"
          />
          <label htmlFor="includeComments" className="text-gray-700">
            Include comments in analysis
            {inputType === "image" || inputType === "text" ? (
              <span className="text-sm text-gray-500 ml-2">(Not applicable for this input type)</span>
            ) : null}
          </label>
        </div>
        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:bg-green-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Checking Facts...
            </>
          ) : (
            "Check Facts"
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Results:</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}

export default FactChecker;
