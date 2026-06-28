'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ClientLayout';
import { FaGlobe, FaAward, FaUsers, FaClock, FaShieldAlt, FaHeadset, FaArrowRight, FaQuoteLeft, FaCheckCircle, FaMedal, FaChartLine, FaPlane, FaRocket } from 'react-icons/fa';

const milestones = [
  { year: '2022', title: 'Company Founded', desc: 'Pulver Global Logistics established with a global vision' },
  { year: '2023', title: 'Global Launch', desc: 'Started serving customers worldwide with standard ground shipping' },
  { year: '2024', title: 'Air Freight Added', desc: 'Launched air freight services for faster domestic deliveries' },
  { year: '2025', title: 'International Expansion', desc: 'Expanded to serve 12 countries worldwide with reliable logistics' },
  { year: '2026', title: 'Growing Strong', desc: 'Serving businesses and individuals with 18K+ successful deliveries' },
];

const values = [
  { icon: FaRocket, title: 'Speed', desc: 'We prioritize fast, efficient delivery without compromising reliability.' },
  { icon: FaShieldAlt, title: 'Reliability', desc: 'Your shipments arrive safely and on time, every time.' },
  { icon: FaGlobe, title: 'Global Reach', desc: 'Serving 12 countries with a network of trusted partners.' },
  { icon: FaUsers, title: 'Customer First', desc: 'Dedicated support team available Mon-Fri to solve your logistics challenges.' },
];

const stats = [
  { icon: FaGlobe, value: '12', label: 'Countries' },
  { icon: FaUsers, value: '8', label: 'Team Members' },
  { icon: FaClock, value: '9AM-6PM', label: 'Mon-Fri Support' },
  { icon: FaAward, value: '92%', label: 'Satisfaction' },
];

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-[#2c00cc] to-[#5f33ff] py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40"></div>
          <img src="/assets/about-hero.png" alt="Global logistics" className="h-full w-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Pulver Global Logistics</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Connecting the World Since 2022 — Delivering Excellence Worldwide</p>
        </div>
      </div>

      {/* Mission - Image Right */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#84cc16] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c00cc] dark:text-white mt-2 mb-6">
                Connecting the World,<br />One Shipment at a Time
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Founded in 2022 with a global vision, Pulver Global Logistics has grown into an international logistics network. We specialize in domestic and international shipping with a commitment to safe handling of all cargo types.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We believe that great logistics shouldn't be complicated. Our team works around the clock to ensure your packages arrive safely, on time, and in perfect condition — from small documents to large freight.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <stat.icon className="text-2xl text-[#84cc16] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#2c00cc] dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=800&q=80" alt="Our mission" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#84cc16] to-[#a3e635] rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-extrabold text-white">4+</p>
                <p className="text-white/90 text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c00cc] dark:text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Principles that drive everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-[#84cc16] to-[#a3e635] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-500/20">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2c00cc] dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c00cc] dark:text-white mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">3 years of logistics excellence</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#84cc16] to-[#a3e635] hidden md:block rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 md:px-8 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:order-3'}`}>
                    <div className={`bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-lg ${index % 2 === 0 ? 'md:ml-auto' : ''}`} style={{ maxWidth: '400px' }}>
                      <p className="text-3xl font-extrabold text-[#84cc16] mb-2">{milestone.year}</p>
                      <h3 className="text-xl font-bold text-[#2c00cc] dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-[#84cc16] to-[#a3e635] rounded-full border-4 border-white dark:border-gray-800 shadow-lg hidden md:block"></div>
                  <div className="md:w-1/2 md:order-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2c00cc] to-[#5f33ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl text-white/70 mb-8">Experience the Pulver Global difference today</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-bold rounded-full hover:shadow-xl hover:shadow-lime-500/30">
              Contact Us <FaArrowRight className="ml-2" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#2c00cc] transition-all">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}