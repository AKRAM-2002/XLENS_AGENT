"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, CheckCircle, Sparkles, ArrowRight, Star, Users, Globe, Lightbulb, Share2, Info, 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingScreen from "../components/LoadingScreen";

const features = [
  {
    icon: <CheckCircle className="h-12 w-12" />,
    title: "FactChecker",
    description: "Instantly verify tweet accuracy using AI.",
    path: "/FactChecker",
    gradient: "from-green-600 to-emerald-500",
  },
  {
    icon: <MessageSquare className="h-12 w-12" />,
    title: "Sentiment Analyzer",
    description: "Analyze the emotional tone of any tweet.",
    path: "/SentimentAnalyzer",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    icon: <Sparkles className="h-12 w-12" />,
    title: "Viral Tweet Generator",
    description: "Craft tweets designed to go viral.",
    path: "/ViralGenerator",
    gradient: "from-purple-600 to-pink-500",
  },
];

const stats = [
  { icon: <Users className="h-6 w-6" />, value: "10K+", label: "Active Users" },
  { icon: <Star className="h-6 w-6" />, value: "4.9/5", label: "User Rating" },
  { icon: <Globe className="h-6 w-6" />, value: "150+", label: "Countries" },
];

const testimonials = [
  {
    quote: "Truth Terminal has transformed how we verify social media content. It's an essential tool for our team.",
    author: "Sarah Johnson",
    role: "Social Media Manager",
    company: "TechCorp",
  },
  {
    quote: "The sentiment analysis feature helps us maintain the perfect tone in our communications.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "Growth Labs",
  },
  {
    quote: "Our engagement rates increased by 300% using the viral tweet generator. Simply amazing!",
    author: "Emma Williams",
    role: "Content Strategist",
    company: "Viral Media",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    features: ["100 tweet checks/month", "Basic sentiment analysis", "Community support"],
    gradient: "from-gray-600 to-gray-500",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "1000 tweet checks/month",
      "Advanced sentiment analysis",
      "Viral tweet generator",
      "Priority support",
    ],
    gradient: "from-blue-600 to-indigo-500",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: ["Unlimited tweet checks", "Custom AI models", "API access", "Dedicated support"],
    gradient: "from-purple-600 to-pink-500",
  },
];

const whyChooseUs = [
  { icon: <Lightbulb className="h-6 w-6" />, title: "Innovative AI", description: "Cutting-edge AI technology for real-time analysis." },
  { icon: <Share2 className="h-6 w-6" />, title: "Easy Integration", description: "Seamlessly integrates with your existing workflow." },
  { icon: <Info className="h-6 w-6" />, title: "Data-Driven Insights", description: "Leverage AI to gain actionable insights from social media data." },
];

const blogPosts = [
  { title: "The Future of AI in Social Media", date: "Jan 5, 2025", link: "#" },
  { title: "How AI is Changing Content Creation", date: "Dec 20, 2024", link: "#" },
  { title: "Case Study: Viral Tweet Success", date: "Nov 15, 2024", link: "#" },
];

const faqs = [
  { question: "How accurate is the FactChecker?", answer: "Our AI model is trained on vast datasets, ensuring high accuracy in fact-checking." },
  { question: "Can I use Truth Terminal for business purposes?", answer: "Yes, we offer tailored plans for businesses with additional features like API access." },
  { question: "What makes the Viral Tweet Generator effective?", answer: "It uses AI to analyze trends and user engagement patterns to craft tweets with high viral potential." },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            Trusted by 10,000+ content creators
          </span>
          <motion.h1
            className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Truth Terminal
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Decode Tweets with AI to fact-check content, analyze sentiment, and generate viral posts. Elevate your Twitter game now!
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              variants={itemVariants}
            >
              <Link href={feature.path}>
                <div className={`inline-flex rounded-xl p-3 bg-gradient-to-r ${feature.gradient} mb-4`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">{feature.title}</h2>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-purple-600 transition-colors">
                  Try now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Loved by content creators worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
          {/* Pricing Section */}
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to elevate your Twitter game?</h2>
            <p className="text-lg mb-8 opacity-90">Join thousands of content creators who trust Truth Terminal</p>
            <Button size="lg" variant="secondary">
              Start Your Free Trial
            </Button>
          </div>

          {/* Pricing Section */}
          <div className="container mx-auto px-4 pt-16">
            <div className="mb-24">
              <h2 className="text-3xl font-bold text-center mb-12">Simple, transparent pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`p-8 relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
              
      </motion.div>
      {/* Why Choose Us Section */}
        <motion.section variants={itemVariants} className="max-w-7xl mx-auto px-6 py-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Truth Terminal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
        {/* Resources Section */}
          <motion.section variants={itemVariants} className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <Link href={post.link} className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.section>
  
          {/* FAQ Section */}
          <motion.section variants={itemVariants} className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Newsletter Section */}
          <motion.section variants={itemVariants} className="bg-gray-900 text-white py-16 rounded-2xl mb-24">
            <div className="text-center max-w-2xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-8">Get the latest updates on AI and social media analysis delivered to your inbox.</p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Company Info */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Truth Terminal</h3>
                  <p className="text-gray-400 mb-4">Empowering content creators with AI-driven social media analysis tools.</p>
                  <div className="flex space-x-4">
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                      <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                      <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                      <FacebookIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                      <InstagramIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
    
                {/* Quick Links */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                    <li><Link href="/features" className="hover:text-blue-500 transition-colors">Features</Link></li>
                    <li><Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing</Link></li>
                    <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
                  </ul>
                </div>
    
                {/* Resources */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
                  <ul className="space-y-3">
                    <li><Link href="/documentation" className="hover:text-blue-500 transition-colors">Documentation</Link></li>
                    <li><Link href="/api" className="hover:text-blue-500 transition-colors">API Reference</Link></li>
                    <li><Link href="/support" className="hover:text-blue-500 transition-colors">Support Center</Link></li>
                    <li><Link href="/status" className="hover:text-blue-500 transition-colors">Status</Link></li>
                  </ul>
                </div>
    
                {/* Contact Info */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <MailIcon className="h-5 w-5 mr-2" />
                      <span>support@truthterminal.com</span>
                    </li>
                    <li className="flex items-center">
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      <span>+1 (555) 123-4567</span>
                    </li>
                    <li className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>San Francisco, CA</span>
                    </li>
                  </ul>
                </div>
              </div>
    
              {/* Bottom Bar */}
              <div className="pt-8 mt-8 border-t border-gray-800 text-sm">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p>&copy; 2025 Truth Terminal. All rights reserved.</p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
                    <Link href="/cookies" className="hover:text-blue-500 transition-colors">Cookie Policy</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
  
        
    
    
  );
}

export default Home;
