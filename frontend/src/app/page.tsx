"use client";
import { useNavigate } from "react-router-dom";
import Link from "next/link";
import { MessageSquare, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const features = [
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "FactChecker",
      description: "Instantly verify tweet accuracy using AI.",
      path: "/FactChecker",
      gradient: "from-green-600 to-emerald-500"
    },
    {
      icon: <MessageSquare className="h-12 w-12" />,
      title: "Sentiment Analyzer",
      description: "Analyze the emotional tone of any tweet.",
      path: "/SentimentAnalyzer",
      gradient: "from-blue-600 to-indigo-500"
    },
    {
      icon: <Sparkles className="h-12 w-12" />,
      title: "Viral Tweet Generator",
      description: "Craft tweets designed to go viral.",
      path: "/ViralGenerator",
      gradient: "from-purple-600 to-pink-500"
    }
  ];

// Home Page
function Home () {
  

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Truth Terminal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Decode Tweets with AI to fact-check content, analyze sentiment, and generate viral posts. 
            Elevate your Twitter game now!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.path}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              />
              <div className={`inline-flex rounded-xl p-3 bg-gradient-to-r ${feature.gradient} mb-4`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-purple-600 transition-colors">
                Try now
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
