"use client";
import React, { useState } from 'react';
import { Twitter, CheckCircle, MessageSquare, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navbar Component
const Navbar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/FactChecker', label: 'Fact Checker' },
    { path: '/SentimentAnalyzer', label: 'Sentiment' },
    { path: '/ViralGenerator', label: 'Viral Generator' }
  ];

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Twitter className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              XLENS
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  pathname === path
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;