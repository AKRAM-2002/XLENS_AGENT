// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Truth Terminal</h3>
          <p className="text-gray-400 mb-4">Empowering content creators with AI-driven social media analysis tools.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <LinkedIn className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <Instagram className="h-5 w-5" />
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
              <Mail className="h-5 w-5 mr-2" />
              <span>support@truthterminal.com</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
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
);
