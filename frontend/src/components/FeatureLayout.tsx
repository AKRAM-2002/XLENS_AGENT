'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, Sparkles, CheckCircle, Loader2, Upload, Image } from 'lucide-react';

// Common Feature Layout Component
export const FeatureLayout = ({ 
  icon, 
  title, 
  description, 
  gradient,
  children 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className={`inline-flex rounded-xl p-3 bg-gradient-to-r ${gradient} mb-4`}>
          {React.cloneElement(icon as React.ReactElement, { className: "h-12 w-12 text-white" })}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  </div>
);

