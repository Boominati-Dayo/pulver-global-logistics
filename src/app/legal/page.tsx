'use client';

import { FaGavel, FaFileAlt, FaBalanceScale, FaShieldAlt, FaUserCheck, FaHandshake, FaAccessibleIcon } from 'react-icons/fa';

const legalDocs = [
  { icon: FaFileAlt, title: 'Privacy Policy', href: '/privacy', desc: 'How we collect, use, and protect your personal information' },
  { icon: FaGavel, title: 'Terms of Service', href: '/terms', desc: 'The legal agreement governing your use of Pulver Global Logistics services' },
  { icon: FaBalanceScale, title: 'Fair Chance Act Notice', href: '/fair-chance-act', desc: 'Information for applicants regarding background checks' },
  { icon: FaAccessibleIcon, title: 'Accessibility Statement', href: '/accessibility', desc: "Our commitment to web accessibility and ADA compliance" },
];

export default function Legal() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] py-16 text-center pt-[120px]">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Legal Center</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">Important legal information about Pulver Global Logistics</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocs.map((doc, index) => (
            <a key={index} href={doc.href} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-[#84cc16]/10 rounded-2xl flex items-center justify-center mb-5">
                <doc.icon className="text-2xl text-[#84cc16]" />
              </div>
              <h3 className="text-xl font-bold text-[#2c00cc] dark:text-white mb-2 group-hover:text-[#84cc16] transition-colors">{doc.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{doc.desc}</p>
              <span className="text-[#84cc16] text-sm font-medium group-hover:underline">Read more →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}