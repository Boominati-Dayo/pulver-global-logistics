'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ClientLayout';
import { FaPlane, FaShip, FaTruck, FaWarehouse, FaArrowRight, FaCheck, FaBolt, FaPaw, FaShieldAlt, FaCog } from 'react-icons/fa';

const allServices = [
  { icon: FaTruck, title: 'Ground Transport', desc: 'Nationwide coverage across the USA with reliable delivery solutions. We ensure your packages reach any destination safely and on time.', features: ['Nationwide USA coverage', 'Standard and express options', 'Real-time tracking', 'Door-to-door service'], price: 'From $9.99/pkg', image: '/assets/land-shipment.png', href: '/services/ground-transport' },
  { icon: FaPlane, title: 'Air Freight', desc: 'Fast air freight services to 12 countries worldwide. When speed matters, SXI delivers with precision and reliability.', features: ['12 countries served', 'Express 1-3 day delivery', 'Customs clearance included', 'Door-to-door service'], price: 'From $29.99/pkg', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80', href: '/services/air-freight' },
  { icon: FaShip, title: 'Sea Freight', desc: 'Cost-effective ocean cargo solutions for large-volume shipments. Perfect for businesses shipping bulk goods internationally.', features: ['Full container loads (FCL)', 'Less than container (LCL)', 'Port-to-port and door-to-door', 'Competitive rates'], price: 'Custom Quote', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80', href: '/services/sea-freight' },
  { icon: FaWarehouse, title: 'Warehousing & Storage', desc: 'Secure warehousing with climate control options, inventory management, pick-and-pack services, and distribution solutions.', features: ['Climate-controlled facilities', 'Inventory management', 'Pick and pack services', 'Distribution network'], price: 'From $0.50/day', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80', href: '/services/warehousing' },
  { icon: FaBolt, title: 'Express Delivery', desc: 'Same-day and next-day delivery for urgent shipments. When you need it now, SXI delivers.', features: ['Same-day delivery options', 'Next-day nationwide', 'Time-definite windows', 'Dedicated courier'], price: 'Varies by Distance', image: '/assets/express-delivery.webp', href: '/services/express-delivery' },
  { icon: FaPaw, title: 'Pet Transport', desc: 'Safe and comfortable pet shipping services. Your furry family members travel with care, comfort, and compliance.', features: ['IATA-compliant crates', 'Climate-controlled transport', 'Door-to-door service', 'Regulatory compliance'], price: 'From $149.99', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80', href: '/services/pet-transport' },
  { icon: FaShieldAlt, title: 'Valuable Goods', desc: 'Insured shipping for precious items and high-value cargo. Enhanced security and comprehensive coverage.', features: ['Full insurance coverage', 'Secure handling protocols', 'White-glove service', 'High-value protection'], price: 'From 2% of value', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80', href: '/services/valuable-goods' },
  { icon: FaCog, title: 'Custom Solutions', desc: 'Tailored logistics for your unique requirements. From specialized transport to multi-modal supply chains.', features: ['Specialized equipment transport', 'Multi-modal supply chain', 'Hazmat shipping', 'Supply chain consulting'], price: 'Custom Quote', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', href: '/services/custom-solutions' },
];

export default function Services() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-[#1a365d] via-[#0f2340] to-[#1a365d] py-20 text-center relative overflow-hidden pt-[120px]">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1950&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1a365d]/80 to-[#1a365d]"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SXI Services</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">Reliable logistics solutions across the USA and worldwide. From domestic deliveries to international freight, we've got you covered.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {allServices.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}>
              <div className="flex-1 w-full">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group h-full">
                  <img src={service.image} alt={service.title} className="w-full h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-xl flex items-center justify-center">
                        <service.icon className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <span className="text-sm text-white/70">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-2xl flex items-center justify-center shadow-md">
                    <service.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a365d] dark:text-white">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">{service.desc}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheck className="text-[#ea580c] mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="inline-flex items-center px-6 py-3 bg-[#1a365d] text-white font-bold rounded-full hover:bg-[#0f2340] transition-all hover:shadow-lg">
                  Learn More <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#ea580c] to-[#f97316] py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-white/80 mb-8">Contact us for a custom quote tailored to your needs</p>
        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-[#1a365d] text-white font-bold rounded-full hover:bg-[#0f2340] transition-all">
          Contact Us <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}