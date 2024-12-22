"use client"
import { Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Twitter className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">XLENS</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/FactChecker"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/fact-checker'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Fact Checker
            </Link>
            <Link
              href="/SentimentAnalyzer"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/sentiment'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Sentiment
            </Link>
            <Link
              href="/ViralGenerator"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/viral'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Viral Generator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;