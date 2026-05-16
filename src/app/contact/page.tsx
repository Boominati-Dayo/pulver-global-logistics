'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ClientLayout';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaUser, FaEnvelopeOpenText, FaCheckCircle, FaSpinner, FaPlane, FaShip, FaTruck, FaWarehouse, FaRocket } from 'react-icons/fa';

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true); setError(''); setSuccess(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
      } else { setError(data.error || 'Failed to send message.'); }
    } catch { setError('An error occurred.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#1a365d] to-[#2c5282] py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">Get in touch with our team. We're here to help with all your shipping needs.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1a365d] dark:text-white mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Have questions? Our team is ready to assist you 24/7.</p>
            </div>
            <div className="space-y-5">
              {[
                { icon: FaMapMarkerAlt, title: 'Our Office', content: 'Miami, FL\nUnited States' },
                { icon: FaPhone, title: 'Phone', content: '+1 (234) 567-890' },
                { icon: FaEnvelope, title: 'Email', content: 'info@globalexpresslogistics.com' },
                { icon: FaClock, title: 'Business Hours', content: 'Mon-Sat: 8AM - 10PM EST\nSun: Emergency only' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ea580c]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-xl text-[#ea580c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a365d] dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-[#1a365d] dark:text-white mb-4">Our Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ icon: FaPlane, label: 'Air Freight' }, { icon: FaShip, label: 'Sea Freight' }, { icon: FaTruck, label: 'Ground' }, { icon: FaWarehouse, label: 'Warehousing' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <s.icon className="text-[#ea580c]" /> {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaEnvelopeOpenText className="text-2xl text-[#ea580c]" />
                <h2 className="text-2xl font-bold text-[#1a365d] dark:text-white">Send Us a Message</h2>
              </div>
              {success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-200"><FaCheckCircle /> Thank you! Your message has been sent successfully.</div>}
              {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Interest</label><select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"><option value="">Select a service</option><option value="air-freight">Air Freight</option><option value="sea-freight">Sea Freight</option><option value="ground-transport">Ground Transport</option><option value="warehousing">Warehousing & Storage</option><option value="express-delivery">Express Delivery</option><option value="pet-transport">Pet Transport</option><option value="valuable-goods">Valuable Goods</option><option value="custom-solutions">Custom Solutions</option><option value="other">Other</option></select></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell us about your needs..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ea580c] focus:border-transparent resize-none"></textarea></div>
                <button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                  {isLoading ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaEnvelope /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}