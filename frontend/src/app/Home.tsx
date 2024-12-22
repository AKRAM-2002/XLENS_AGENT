import { useNavigate } from "react-router-dom";
import { MessageSquare, CheckCircle, Sparkles } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-12 w-12 text-green-400" />,
    title: "Fact Checker",
    description: "Instantly verify tweet accuracy using AI.",
    path: "/fact-checker",
    bg: "bg-gradient-to-r from-green-600 to-green-500",
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-blue-400" />,
    title: "Sentiment Analyzer",
    description: "Analyze the emotional tone of any tweet.",
    path: "/sentiment",
    bg: "bg-gradient-to-r from-blue-600 to-blue-500",
  },
  {
    icon: <Sparkles className="h-12 w-12 text-purple-400" />,
    title: "Viral Tweet Generator",
    description: "Craft tweets designed to go viral.",
    path: "/viral",
    bg: "bg-gradient-to-r from-purple-600 to-purple-500",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <header className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4">
          Truth Terminal
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Decode Tweets with AI to fact-check tweets, analyze sentiment, and
          generate viral content. Elevate your Twitter game now!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-5xl">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => navigate(feature.path)}
            className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${feature.bg}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold">{feature.title}</h2>
              <p className="text-gray-200 mt-2">{feature.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
