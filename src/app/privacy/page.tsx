'use client';

import { useTheme } from '@/components/ClientLayout';
import { useSettings } from '@/components/SettingsContext';
import { FaShieldAlt, FaUserShield, FaLock, FaDatabase, FaCookie, FaExchangeAlt, FaEnvelope } from 'react-icons/fa';

export default function Privacy() {
  const { isDarkMode } = useTheme();
  const { phone, email } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] py-16 text-center pt-[120px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-lg text-white/70">Last updated: January 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-10">
          {[
            { icon: FaShieldAlt, title: 'Introduction', content: 'At SwiftXpress Inc., we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully.' },
            { icon: FaDatabase, title: 'Information We Collect', content: 'We collect information you provide directly: name, email, phone, address, shipping details, payment information (processed securely), and communication preferences.' },
            { icon: FaUserShield, title: 'How We Use Your Information', content: 'We use your information to: process shipping requests, provide tracking updates, send transactional emails, respond to inquiries, improve our services, send marketing communications (with consent), and comply with legal obligations.' },
            { icon: FaExchangeAlt, title: 'Information Sharing', content: 'We do not sell your personal information. We may share information with: service providers (shipping partners, payment processors), legal authorities when required, and business partners with your explicit consent.' },
            { icon: FaLock, title: 'Data Security', content: 'We implement SSL encryption, secure servers, regular security audits, and access controls. While we strive for security, no method of transmission over the Internet is 100% secure.' },
            { icon: FaCookie, title: 'Cookies & Tracking', content: 'We use essential cookies (required for basic functionality), analytics cookies (to understand site usage), and marketing cookies (with your consent). You can control cookie preferences through your browser settings.' },
          ].map((section, i) => (
            <section key={i}>
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="text-2xl text-[#ea580c]" />
                <h2 className="text-2xl font-bold text-[#1a365d] dark:text-white">{section.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </section>
          ))}

          <section className="bg-gradient-to-r from-[#ea580c]/10 to-[#f97316]/10 rounded-xl p-6 border border-[#ea580c]/20">
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-2xl text-[#ea580c]" />
              <h2 className="text-2xl font-bold text-[#1a365d] dark:text-white">Contact Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Questions about this Privacy Policy?</p>
            <p className="text-[#1a365d] dark:text-white font-medium">Email: {email} | Phone: {phone} </p>
          </section>
        </div>
      </div>
    </div>
  );
}