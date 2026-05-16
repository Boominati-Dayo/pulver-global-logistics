'use client';

import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPlane, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2340] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-xl flex items-center justify-center">
                <FaPlane className="text-white text-lg" />
              </div>
              <div>
<span className="font-bold text-lg">SXI</span>
              <span className="text-xs block -mt-0.5 text-white/60">SwiftXpress Inc.</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Delivering excellence across 50+ countries. Comprehensive logistics solutions with real-time tracking, air freight, sea freight, and express delivery services.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#ea580c] mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-[#ea580c] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-[#ea580c] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#ea580c] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-[#ea580c] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#ea580c] mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/ground-transport" className="text-gray-300 hover:text-[#ea580c] transition-colors">Ground Transport</Link></li>
              <li><Link href="/services/air-freight" className="text-gray-300 hover:text-[#ea580c] transition-colors">Air Freight</Link></li>
              <li><Link href="/services/sea-freight" className="text-gray-300 hover:text-[#ea580c] transition-colors">Sea Freight</Link></li>
              <li><Link href="/services/warehousing" className="text-gray-300 hover:text-[#ea580c] transition-colors">Warehousing</Link></li>
              <li><Link href="/services/express-delivery" className="text-gray-300 hover:text-[#ea580c] transition-colors">Express Delivery</Link></li>
              <li><Link href="/services/pet-transport" className="text-gray-300 hover:text-[#ea580c] transition-colors">Pet Transport</Link></li>
              <li><Link href="/services/valuable-goods" className="text-gray-300 hover:text-[#ea580c] transition-colors">Valuable Goods</Link></li>
              <li><Link href="/services/custom-solutions" className="text-gray-300 hover:text-[#ea580c] transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#ea580c] mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#ea580c] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Miami, FL<br />Serving worldwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#ea580c] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#ea580c] transition-colors">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#ea580c] flex-shrink-0" />
                <a href="mailto:info@globalexpresslogistics.com" className="text-gray-300 hover:text-[#ea580c] transition-colors text-sm">info@globalexpresslogistics.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-[#ea580c] flex-shrink-0" />
                <span className="text-gray-300">Mon-Sat: 8AM - 10PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FaGlobe className="text-[#ea580c]" />
              <span className="text-sm text-gray-400">SwiftXpress Inc. — Connecting the World</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} SwiftXpress Inc. All rights reserved.
              </p>
              <div className="flex justify-center md:justify-end space-x-4 mt-2 text-xs">
                <Link href="/privacy" className="text-gray-400 hover:text-[#ea580c] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-[#ea580c] transition-colors">Terms of Service</Link>
                <Link href="/legal" className="text-gray-400 hover:text-[#ea580c] transition-colors">Legal</Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-[#ea580c] transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}