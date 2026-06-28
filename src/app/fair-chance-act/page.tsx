'use client';

import { useSettings } from '@/components/SettingsContext';
import { FaBalanceScale, FaUserCheck, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

export default function FairChanceAct() {
  const { phone, email } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] py-16 text-center pt-[120px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fair Chance Act Notice</h1>
        <p className="text-lg text-white/70">Equal opportunity employment information</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <div className="flex items-start gap-4 p-4 bg-[#84cc16]/10 rounded-xl border border-[#84cc16]/20">
            <FaInfoCircle className="text-[#84cc16] text-2xl mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Pulver Global Logistics is committed to providing equal employment opportunities to all applicants. In compliance with the Fair Chance Act, we do not discriminate based on criminal history unless it is job-related and consistent with business necessity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Our Hiring Process</h2>
            <div className="space-y-4">
              {[
                'All applicants are evaluated based on their qualifications for the position',
                'Criminal background checks are conducted only after a conditional offer of employment',
                'We consider the nature and gravity of any criminal offense, its relevance to the role, and the time elapsed since conviction',
                'Applicants have the opportunity to provide additional context about their background',
                'We do not consider arrests that did not result in conviction',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#84cc16] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If we intend to deny employment based on criminal history, you will be notified and given the opportunity to explain or contest the decision. You have the right to:
            </p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {['Receive a copy of the background check report', 'Challenge any inaccuracies in the report', 'Provide evidence of rehabilitation', 'Request an individualized assessment'].map((right, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <FaUserCheck className="text-[#84cc16] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{right}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2c00cc] dark:text-white mb-4">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">For questions about our fair chance hiring process, contact:</p>
            <p className="mt-2 text-[#2c00cc] dark:text-white font-medium">Email: {email} | Phone: {phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}