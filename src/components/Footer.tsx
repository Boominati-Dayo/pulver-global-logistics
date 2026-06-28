'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaClock, FaGlobe } from 'react-icons/fa';
import { useSettings } from './SettingsContext';

export default function Footer() {
  const { phone, email } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#160066] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
<div>
            <Image src="/swiftXpress-logo.png" alt="Pulver Global Logistics" width={140} height={40} className="h-10 w-auto mb-4" />
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
               Delivering excellence worldwide. Comprehensive logistics solutions with real-time tracking, air freight, sea freight, and express delivery services.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#84cc16] mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-[#84cc16] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-[#84cc16] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#84cc16] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-[#84cc16] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#84cc16] mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/ground-transport" className="text-gray-300 hover:text-[#84cc16] transition-colors">Ground Transport</Link></li>
              <li><Link href="/services/air-freight" className="text-gray-300 hover:text-[#84cc16] transition-colors">Air Freight</Link></li>
              <li><Link href="/services/sea-freight" className="text-gray-300 hover:text-[#84cc16] transition-colors">Sea Freight</Link></li>
              <li><Link href="/services/warehousing" className="text-gray-300 hover:text-[#84cc16] transition-colors">Warehousing</Link></li>
              <li><Link href="/services/express-delivery" className="text-gray-300 hover:text-[#84cc16] transition-colors">Express Delivery</Link></li>
              <li><Link href="/services/pet-transport" className="text-gray-300 hover:text-[#84cc16] transition-colors">Pet Transport</Link></li>
              <li><Link href="/services/valuable-goods" className="text-gray-300 hover:text-[#84cc16] transition-colors">Valuable Goods</Link></li>
              <li><Link href="/services/custom-solutions" className="text-gray-300 hover:text-[#84cc16] transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#84cc16] mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#84cc16] flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-[#84cc16] transition-colors">{phone}</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#84cc16] flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-300 hover:text-[#84cc16] transition-colors text-sm">{email}</a>
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
              <FaGlobe className="text-[#84cc16]" />
              <span className="text-sm text-gray-400">Pulver Global Logistics — Connecting the World</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} Pulver Global Logistics. All rights reserved.
              </p>
              <div className="flex justify-center md:justify-end space-x-4 mt-2 text-xs">
                <Link href="/privacy" className="text-gray-400 hover:text-[#84cc16] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-[#84cc16] transition-colors">Terms of Service</Link>
                <Link href="/legal" className="text-gray-400 hover:text-[#84cc16] transition-colors">Legal</Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-[#84cc16] transition-colors">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}