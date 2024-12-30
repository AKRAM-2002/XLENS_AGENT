import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Logo pulse animation */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-75" />
      </div>
      
      {/* Loading text with gradient */}
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Truth Terminal
      </h1>
      
      {/* Loading bar */}
      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-loading-bar" />
      </div>
    </div>
  );
};

export default LoadingScreen;