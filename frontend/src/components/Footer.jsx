import React from 'react';
import { 
  ShoppingBag, 
  Home, 
  Info, 
  Tag, 
  Star, 
  Smartphone, 
  Shirt, 
  Dumbbell, 
  HelpCircle, 
  Play, 
  FileText, 
  BookOpen, 
  Truck, 
  RefreshCw, 
  Headphones, 
  Shield, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const EcommerceFooter = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <ShoppingBag className="w-10 h-10 text-indigo-600" />
              <span className="ml-3 text-2xl font-bold text-gray-900">ShopHub</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Your trusted online shopping destination. Quality products, fast delivery, and excellent customer service.
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Truck className="w-5 h-5 mr-2 text-indigo-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Home className="w-4 h-4 mr-2" /> Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Info className="w-4 h-4 mr-2" /> About</a></li>
              <li><a href="/shop" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Tag className="w-4 h-4 mr-2" /> Shop</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Mail className="w-4 h-4 mr-2" /> Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><a href="/electronics" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Smartphone className="w-4 h-4 mr-2" /> Electronics</a></li>
              <li><a href="/fashion" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Shirt className="w-4 h-4 mr-2" /> Fashion</a></li>
              <li><a href="/home" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Home className="w-4 h-4 mr-2" /> Home & Garden</a></li>
              <li><a href="/sports" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Dumbbell className="w-4 h-4 mr-2" /> Sports</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="/shipping" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Truck className="w-4 h-4 mr-2" /> Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><RefreshCw className="w-4 h-4 mr-2" /> Returns</a></li>
              <li><a href="/support" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><Headphones className="w-4 h-4 mr-2" /> Support</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-indigo-600 flex items-center transition-colors"><HelpCircle className="w-4 h-4 mr-2" /> FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="text-sm">123 Commerce St, City, State 12345</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="text-sm">support@shopcart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">Subscribe to our newsletter for the latest updates and offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full md:w-64"
              />
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2024 ShopCart. All rights reserved.
            </div>
            
            {/* Payment Methods */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">VISA</span>
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">MC</span>
              </div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">PP</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EcommerceFooter;