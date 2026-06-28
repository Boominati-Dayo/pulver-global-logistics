'use client';

import { useSettings } from '@/components/SettingsContext';
import { FaAccessibleIcon, FaWheelchair, FaUniversalAccess, FaCheckCircle } from 'react-icons/fa';

export default function Accessibility() {
  const { phone } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] py-16 text-center pt-[120px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Accessibility Statement</h1>
        <p className="text-lg text-white/70">Our commitment to making Pulver Global Logistics accessible to everyone</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Pulver Global Logistics is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Our Commitment</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Accessibility Features</h2>
            <div className="space-y-4">
              {['Semantic HTML structure for screen readers', 'Keyboard navigation support for all interactive elements', 'Alt text for all images and non-text content', 'High contrast color schemes for visual clarity', 'Resizable text without loss of functionality', 'ARIA labels for complex interactive components'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#84cc16] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Feedback & Support</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We welcome your feedback on the accessibility of Pulver Global Logistics. If you experience barriers to access, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-[#2c00cc] dark:text-white font-medium">Email: info@pulvergloballogistics.com</p>
              <p className="text-[#2c00cc] dark:text-white font-medium">Phone: {phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}