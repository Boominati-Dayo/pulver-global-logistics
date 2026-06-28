'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ClientLayout';
import { FaQuestionCircle, FaPlus, FaMinus, FaSearch, FaBox, FaTruck, FaPlane, FaShip, FaWarehouse, FaGlobe, FaLock, FaCreditCard, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const faqCategories = [
  { id: 'all', label: 'All', icon: FaQuestionCircle }, { id: 'tracking', label: 'Tracking', icon: FaBox },
  { id: 'shipping', label: 'Shipping', icon: FaTruck }, { id: 'services', label: 'Services', icon: FaGlobe },
  { id: 'payment', label: 'Payment', icon: FaCreditCard }, { id: 'account', label: 'Account', icon: FaLock },
];

const faqs = [
  { category: 'tracking', question: 'How do I track my package?', answer: 'Enter your tracking number on our Track page. The tracking number was provided when your shipment was created. You can also sign up for SMS or email notifications for automatic updates.' },
  { category: 'tracking', question: "My tracking information hasn't updated. What should I do?", answer: "Wait 24-48 hours for updates to reflect. If the issue persists, contact our customer support with your tracking number, and we'll investigate immediately." },
  { category: 'tracking', question: 'Can I track multiple packages at once?', answer: 'Yes, enter all tracking numbers separated by commas on our Track page to view all your shipments in one dashboard.' },
  { category: 'shipping', question: 'What shipping options are available?', answer: 'We offer: Air Freight (1-3 days), Express Delivery (same-day/next-day), Ground Transport (3-7 days), and Sea Freight (14-30 days for international).' },
  { category: 'shipping', question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide. International shipping times and costs vary by destination, package size, and selected service. Customs duties may apply.' },
  { category: 'shipping', question: 'What items cannot be shipped?', answer: 'Prohibited items include: hazardous materials, flammable items, weapons, illegal substances, and items restricted by international law. Contact us before shipping if unsure.' },
  { category: 'services', question: 'Do you offer warehousing services?', answer: 'Yes, we provide secure warehousing with climate control, inventory management, pick-and-pack services, and distribution. Contact our sales team for customized solutions.' },
  { category: 'services', question: 'Do you offer customs brokerage?', answer: 'Yes, our experienced customs brokerage team handles all documentation and clearance procedures for international shipments, ensuring compliance and minimizing delays.' },
  { category: 'payment', question: 'What payment methods do you accept?', answer: 'We accept major credit cards (Visa, MasterCard, Amex), bank transfers, PayPal, and corporate accounts with prior approval.' },
  { category: 'payment', question: 'Are there any hidden fees?', answer: 'No. All fees are clearly stated before confirmation. Additional charges may apply for fuel surcharges, residential deliveries, and oversized packages — disclosed during quoting.' },
  { category: 'account', question: 'How do I create an account?', answer: 'Click "Login" in the navigation and select "Register." Provide your email and create a password. Business accounts may apply for bulk pricing through our sales team.' },
  { category: 'account', question: 'I forgot my password. What should I do?', answer: 'Click "Forgot Password" on the login page and enter your email. Check your spam folder if you don\'t receive the reset email.' },
];

export default function FAQ() {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#2c00cc] to-[#5f33ff] py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">Find answers to common questions about our services, shipping, tracking, and more.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#84cc16] focus:border-transparent" />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all ${activeCategory === cat.id ? 'bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-bold shadow-md' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
                <cat.icon className="text-sm" /> <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="text-lg font-semibold text-[#2c00cc] dark:text-white pr-4">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${expandedIndex === index ? 'bg-[#84cc16] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                  {expandedIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
              </button>
              {expandedIndex === index && (
                <div className="px-6 pb-5"><p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p></div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && <div className="text-center py-12"><FaQuestionCircle className="text-5xl text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No questions found.</p></div>}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#2c00cc] to-[#5f33ff] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">Our support team is available 24/7</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+0000000000000" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-bold rounded-full hover:shadow-lg"><FaPhone className="mr-2" /> Call Us</a>
            <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#2c00cc]"><FaEnvelope className="mr-2" /> Send Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}