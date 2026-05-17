'use client';

import { useTheme } from '@/components/ClientLayout';
import { useSettings } from '@/components/SettingsContext';
import { FaFileContract, FaGavel, FaShippingFast, FaUserCheck, FaDollarSign, FaExclamationTriangle, FaShieldAlt, FaEnvelope } from 'react-icons/fa';

export default function Terms() {
  const { isDarkMode } = useTheme();
  const { phone } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] py-16 text-center pt-[120px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-lg text-white/70">Last updated: January 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-10">
          {[
            { icon: FaFileContract, title: 'Agreement to Terms', content: 'Welcome to SwiftXpress Inc. By accessing our website or using our services, you agree to be bound by these Terms. These Terms constitute a legally binding agreement between you and SXI.' },
            { icon: FaShippingFast, title: 'Our Services', content: 'SXI provides: domestic and international shipping, air/sea/ground freight, warehousing and storage, package tracking, and customs clearance services. Service availability may vary by location.' },
            { icon: FaUserCheck, title: 'Account & Eligibility', content: 'To use certain services, you must: provide accurate information, be at least 18 years of age, not share account credentials, and accept responsibility for account activities.' },
            { icon: FaExclamationTriangle, title: 'Shipping Restrictions', content: 'You agree not to ship: hazardous materials, illegal substances, weapons, perishables without proper packaging, and items prohibited by international law. We reserve the right to inspect and refuse prohibited shipments.' },
            { icon: FaDollarSign, title: 'Pricing & Payment', content: 'All prices are subject to change. Pricing depends on: weight/dimensions, distance, shipping method, and applicable surcharges. Payment is required at booking unless credit terms are established.' },
            { icon: FaShieldAlt, title: 'Liability & Insurance', content: 'Standard coverage: Up to $100 per shipment (included). Extended coverage: Available based on declared value. Claims must be filed within 30 days of delivery. We are not liable for delays beyond our control.' },
            { icon: FaGavel, title: 'Governing Law', content: 'These Terms shall be governed by the laws of the State of Florida, USA. Any disputes shall be resolved in Florida courts.' },
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
            <p className="text-gray-600 dark:text-gray-400 mb-3">Questions about these Terms?</p>
            <p className="text-[#1a365d] dark:text-white font-medium">Email: legal@swiftxpressinc.com | Phone: {phone}</p>
          </section>
        </div>
      </div>
    </div>
  );
}