'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ClientLayout';
import { FaArrowRight, FaCheck, FaPlane, FaShip, FaTruck, FaWarehouse, FaBolt, FaPaw, FaShieldAlt, FaCog, FaClock, FaGlobe, FaLock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBox } from 'react-icons/fa';

const services = {
  'air-freight': {
    icon: FaPlane,
    title: 'Air Freight',
    tagline: 'Express Delivery Worldwide',
    price: 'From $29.99/pkg',
    color: 'from-blue-500 to-blue-600',
    accentColor: '#3b82f6',
    description: 'Fast and reliable air freight services to over 50 countries worldwide. When speed matters, GEL delivers with precision and reliability. Our air freight solutions are designed for businesses and individuals who need time-definite delivery without compromising on safety.',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    features: [
      '1-3 day delivery to 50+ countries',
      'Express and economy options',
      'Customs clearance included',
      'Airport-to-airport and door-to-door',
      'Real-time shipment tracking',
      'Priority handling for urgent cargo',
      'Temperature-controlled options',
      'Hazardous materials capable',
    ],
    howItWorks: [
      { step: '1', title: 'Book Your Shipment', desc: 'Contact us or book online with your cargo details and destination.' },
      { step: '2', title: 'We Collect', desc: 'Our team picks up your package from your location or you drop it at our facility.' },
      { step: '3', title: 'Fast Transit', desc: 'Your cargo flies with priority handling through our global network.' },
      { step: '4', title: 'Delivered', desc: 'Your shipment arrives safely at its destination, on time.' },
    ],
    faqs: [
      { q: 'How fast is air freight delivery?', a: 'Standard air freight delivers in 1-3 business days to most international destinations. Express options can be as fast as same-day for certain routes.' },
      { q: 'What can I ship via air freight?', a: 'We handle most items including documents, electronics, machinery, perishables, and more. Some items require special handling or permits.' },
      { q: 'Is customs clearance included?', a: 'Yes, our air freight service includes customs clearance assistance at both origin and destination.' },
      { q: 'How is air freight pricing calculated?', a: 'Pricing is based on actual weight or volumetric weight (whichever is greater), destination, and service level. Request a quote for accurate pricing.' },
    ],
    cta: 'Get an Air Freight Quote',
  },
  'sea-freight': {
    icon: FaShip,
    title: 'Sea Freight',
    tagline: 'Ocean Cargo Solutions',
    price: 'Custom Quote',
    color: 'from-cyan-500 to-teal-600',
    accentColor: '#06b6d4',
    description: 'Cost-effective ocean freight for large-volume shipments. Perfect for businesses shipping bulk goods internationally. Our sea freight services offer full container (FCL) and less-than-container (LCL) options with comprehensive port-to-port and door-to-door services.',
    heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Full container loads (FCL) and LCL',
      'Port-to-port and door-to-door',
      'Competitive international rates',
      'Global port network access',
      'Container types: 20ft, 40ft, High Cube',
      'Roll-on/Roll-off (RoRo) for vehicles',
      'Project cargo and heavy lift',
      'Customs documentation support',
    ],
    howItWorks: [
      { step: '1', title: 'Request a Quote', desc: 'Get a custom quote based on your cargo volume and destination.' },
      { step: '2', title: 'Container Loading', desc: 'Your cargo is loaded into containers at origin port.' },
      { step: '3', title: 'Ocean Transit', desc: 'Ship sails on scheduled vessel across major shipping lanes.' },
      { step: '4', title: 'Customs & Delivery', desc: 'We handle customs and deliver to your door.' },
    ],
    faqs: [
      { q: 'How long does sea freight take?', a: 'Transit times vary by route. Typically 15-30 days for transoceanic routes, 5-15 days for regional.' },
      { q: 'What is the difference between FCL and LCL?', a: 'FCL (Full Container Load) means you rent an entire container. LCL (Less than Container Load) means your cargo shares a container with others, ideal for smaller shipments.' },
      { q: 'Can you handle oversized cargo?', a: 'Yes, we specialize in project cargo and oversized shipments including machinery, vehicles, and industrial equipment.' },
      { q: 'Are port charges included?', a: 'Our quotes detail all charges. We provide transparent pricing including origin charges, ocean freight, and destination charges.' },
    ],
    cta: 'Get a Sea Freight Quote',
  },
  'ground-transport': {
    icon: FaTruck,
    title: 'Ground Transport',
    tagline: 'Nationwide Coverage',
    price: 'From $9.99/pkg',
    color: 'from-emerald-500 to-green-600',
    accentColor: '#10b981',
    description: 'Reliable ground transportation across the USA with next-day and economy options. Perfect for domestic shipments of all sizes. Our extensive carrier network ensures your packages arrive safely and on time, whether to residential or commercial addresses.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Nationwide USA coverage',
      'Ground and LTL services',
      'Residential and commercial delivery',
      'Last-mile delivery options',
      'Standard and express ground',
      'Freight trucking for large items',
      'Residential package delivery',
      'Business to business (B2B) shipping',
    ],
    howItWorks: [
      { step: '1', title: 'Schedule Pickup', desc: 'Book online or call to schedule package pickup or dropoff.' },
      { step: '2', title: 'We Transport', desc: 'Your package travels through our ground network.' },
      { step: '3', title: 'Last Mile', desc: 'Final delivery to residential or business address.' },
      { step: '4', title: 'Signature', desc: 'Optional signature confirmation available.' },
    ],
    faqs: [
      { q: 'How long does ground shipping take?', a: 'Standard ground shipping takes 3-7 business days within the continental USA. Express options offer next-day or 2-day delivery.' },
      { q: 'Do you deliver to residential addresses?', a: 'Yes, we deliver to all addresses including residential, commercial, and PO boxes.' },
      { q: 'What is LTL shipping?', a: 'LTL (Less Than Truckload) is for shipments that do not require a full truck. It is cost-effective for medium-sized cargo.' },
      { q: 'Can I track my ground shipment?', a: 'Yes, all ground shipments include real-time tracking with GPS updates throughout the journey.' },
    ],
    cta: 'Get a Ground Shipping Quote',
  },
  'warehousing': {
    icon: FaWarehouse,
    title: 'Warehousing & Storage',
    tagline: 'Secure Storage & Distribution',
    price: 'From $0.50/day',
    color: 'from-amber-500 to-orange-500',
    accentColor: '#f59e0b',
    description: 'Secure warehousing with climate control, inventory management, pick-and-pack, and fulfillment services. Our facilities across the USA provide safe storage for your goods with full distribution capabilities. Whether you need short-term storage or long-term fulfillment, we have you covered.',
    heroImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Climate-controlled facilities',
      'Inventory management system',
      'Pick and pack services',
      'Fulfillment and e-commerce',
      'Distribution network',
      'Secure 24/7 surveillance',
      'Short-term and long-term storage',
      'Cross-docking services',
    ],
    howItWorks: [
      { step: '1', title: 'Store Your Goods', desc: 'Ship your inventory to our warehouse facility.' },
      { step: '2', title: 'We Manage', desc: 'Our team catalogs, stores, and manages your inventory.' },
      { step: '3', title: 'Orders Processed', desc: 'When orders come in, we pick, pack, and prepare shipments.' },
      { step: '4', title: 'Shipped Fast', desc: 'Your products are shipped quickly to customers.' },
    ],
    faqs: [
      { q: 'What types of goods can I store?', a: 'We store general merchandise, electronics, documents, machinery parts, and more. Climate-controlled options available for sensitive items.' },
      { q: 'How does inventory management work?', a: 'Our system provides real-time visibility of your stock levels. We handle receiving, storage, picks, and replenishment alerts.' },
      { q: 'Can you fulfill e-commerce orders?', a: 'Yes, we offer full e-commerce fulfillment including order processing, pick and pack, and shipping directly to your customers.' },
      { q: 'What are the storage fees?', a: 'Storage fees start at $0.50 per pallet per day. Rates vary based on space required, handling needs, and contract length.' },
    ],
    cta: 'Get a Warehousing Quote',
  },
  'express-delivery': {
    icon: FaBolt,
    title: 'Express Delivery',
    tagline: 'Same-Day & Next-Day',
    price: 'Varies by Distance',
    color: 'from-purple-500 to-violet-600',
    accentColor: '#8b5cf6',
    description: 'When you need it now, our express delivery service delivers. Same-day, next-day, and time-definite options for urgent shipments. Perfect for critical business documents, medical supplies, e-commerce rush orders, and time-sensitive packages.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Same-day delivery options',
      'Next-day delivery nationwide',
      'Time-definite delivery windows',
      'Urgent document shipping',
      'Medical supply express',
      'E-commerce rush fulfillment',
      'Dedicated courier service',
      'Real-time ETA updates',
    ],
    howItWorks: [
      { step: '1', title: 'Urgent Booking', desc: 'Book express service online or call for immediate pickup.' },
      { step: '2', title: 'Priority Pickup', desc: 'Courier arrives within the hour for same-day, or scheduled for next-day.' },
      { step: '3', title: 'Fast Transit', desc: 'Your package takes priority route with dedicated handling.' },
      { step: '4', title: 'On-Time Delivery', desc: 'Guaranteed delivery in the selected time window.' },
    ],
    faqs: [
      { q: 'How fast is same-day delivery?', a: 'Same-day delivery means your package is collected and delivered within the same business day. Delivery times depend on distance and service area.' },
      { q: 'What is the cutoff time for same-day?', a: 'Same-day service cutoff varies by location. Typically, pickup must be scheduled before noon. Contact us for specific timeframes in your area.' },
      { q: 'Is express delivery available for all locations?', a: 'Express services are available in major metropolitan areas. Next-day delivery covers most of the continental USA.' },
      { q: 'What items qualify for express?', a: 'Documents, small packages, medical supplies, electronics, and retail goods qualify. Hazardous materials may have restrictions.' },
    ],
    cta: 'Book Express Delivery',
  },
  'pet-transport': {
    icon: FaPaw,
    title: 'Pet Transport',
    tagline: 'Safe Pet Shipping Worldwide',
    price: 'From $149.99',
    color: 'from-pink-500 to-rose-600',
    accentColor: '#ec4899',
    description: 'Safe and comfortable pet shipping services. Your furry family members travel with care, comfort, and compliance with all regulations. Whether relocating domestically or internationally, our pet transport service ensures your companions arrive happy and healthy.',
    heroImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    features: [
      'IATA-compliant travel crates',
      'Climate-controlled transport',
      'Door-to-door service',
      'USDA and IATA compliance',
      'International health documentation',
      'Microchip and vaccination support',
      'Domestic and international',
      'Live animal experts on staff',
    ],
    howItWorks: [
      { step: '1', title: 'Consultation', desc: 'We assess your pet\'s needs and plan the journey.' },
      { step: '2', title: 'Documentation', desc: 'We assist with health certificates and travel documents.' },
      { step: '3', title: 'Safe Travel', desc: 'Your pet travels in comfort with climate control.' },
      { step: '4', title: 'Reunion', desc: 'Your pet arrives safely at their new home.' },
    ],
    faqs: [
      { q: 'Can my pet travel in the cabin?', a: 'Cabin travel depends on pet size, airline policy, and destination. We can arrange cabin transport for small pets that meet airline requirements.' },
      { q: 'What documentation is required?', a: 'Requirements vary by destination. Typically: health certificate, vaccination records, microchip, and import permit for international travel.' },
      { q: 'Is my pet comfortable during transport?', a: 'Yes, we use IATA-approved crates, climate-controlled vehicles/aircraft, and minimize travel stress with careful handling.' },
      { q: 'How do I prepare my pet for travel?', a: 'We provide detailed preparation guides including feeding schedule, crate training tips, and comfort items. Consultations included.' },
    ],
    cta: 'Get a Pet Transport Quote',
  },
  'valuable-goods': {
    icon: FaShieldAlt,
    title: 'Valuable Goods',
    tagline: 'Insured Precious Cargo',
    price: 'From 2% of value',
    color: 'from-yellow-500 to-amber-500',
    accentColor: '#f59e0b',
    description: 'Insured shipping for precious items and high-value cargo. Enhanced security and comprehensive coverage for your most important shipments. From fine art and jewelry to electronics and machinery, we provide white-glove service with full insurance protection.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Full insurance coverage',
      'White-glove handling service',
      'Secure handling protocols',
      'High-value protection',
      'Armored transport options',
      'GPS-tracked vehicles',
      'Chain of custody documentation',
      'Custom crating and packaging',
    ],
    howItWorks: [
      { step: '1', title: 'Assessment', desc: 'We evaluate your valuable goods and determine handling requirements.' },
      { step: '2', title: 'Secure Packaging', desc: 'Custom crating and specialized packaging for maximum protection.' },
      { step: '3', title: 'Insured Transit', desc: 'Your shipment travels with full insurance and GPS tracking.' },
      { step: '4', title: 'White-Glove Delivery', desc: 'Careful delivery with signature confirmation.' },
    ],
    faqs: [
      { q: 'What types of valuable goods do you ship?', a: 'We handle fine art, antiques, jewelry, luxury goods, electronics, machinery, medical devices, and other high-value items.' },
      { q: 'How is insurance coverage calculated?', a: 'Insurance rates start at 2% of the declared value. Factors include item type, destination, and required handling.' },
      { q: 'Are my items tracked during transit?', a: 'Yes, all valuable goods shipments include GPS tracking, real-time monitoring, and chain of custody documentation.' },
      { q: 'What happens if my package is damaged?', a: 'Our claims process is streamlined. Report damage immediately, submit documentation, and receive compensation per your coverage terms.' },
    ],
    cta: 'Get a Valuable Goods Quote',
  },
  'custom-solutions': {
    icon: FaCog,
    title: 'Custom Solutions',
    tagline: 'Tailored Logistics',
    price: 'Custom Quote',
    color: 'from-slate-500 to-gray-600',
    accentColor: '#64748b',
    description: 'When standard services do not fit your needs, our custom solutions team designs logistics plans around your unique requirements. From specialized equipment transport to multi-modal supply chain management, we build the solution you need.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Specialized equipment transport',
      'Multi-modal supply chain',
      'Temperature-controlled logistics',
      'Hazmat shipping',
      'Project cargo management',
      'Cross-docking operations',
      'Vendor management',
      'Supply chain consulting',
    ],
    howItWorks: [
      { step: '1', title: 'Consultation', desc: 'We discuss your unique logistics needs and challenges.' },
      { step: '2', title: 'Custom Design', desc: 'Our team designs a logistics plan tailored to you.' },
      { step: '3', title: 'Implementation', desc: 'We execute the solution with dedicated support.' },
      { step: '4', title: 'Ongoing Optimization', desc: 'We continuously improve the solution.' },
    ],
    faqs: [
      { q: 'What makes a solution "custom"?', a: 'Custom solutions address unique requirements that standard services cannot handle. This includes unusual cargo types, specific routing needs, compliance requirements, or integrated supply chain services.' },
      { q: 'How long does it take to set up custom logistics?', a: 'Simple custom solutions can be operational within days. Complex multi-modal supply chains may take 2-4 weeks for full implementation.' },
      { q: 'Do you handle hazardous materials?', a: 'Yes, we have certified hazmat logistics services including proper documentation, labeling, and compliant transport for various hazard classes.' },
      { q: 'Can custom solutions integrate with our existing systems?', a: 'Absolutely. We can integrate with ERP, WMS, and e-commerce platforms through API connections or manual data exchange.' },
    ],
    cta: 'Request Custom Solution',
  },
};

export default function ServiceDetailPage({ params }: { params: { service: string } }) {
  const { isDarkMode } = useTheme();
  const service = services[params.service as keyof typeof services];
  const Icon = service?.icon;

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-[#ea580c] hover:underline">View all services →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-[120px]">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/90 via-[#1a365d]/70 to-transparent"></div>
        </div>
        <div className="absolute top-20 right-8 w-72 h-72 bg-[#ea580c]/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 bg-[${service.accentColor}]/20 border border-[${service.accentColor}]/30 rounded-full px-4 py-2 mb-6`}>
              <Icon className={`text-[${service.accentColor}]`} />
              <span className="text-white text-sm font-medium">{service.tagline}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">{service.title}</h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                {service.cta} <FaArrowRight className="ml-2" />
              </Link>
              <Link href="/track" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                Track Shipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Price Badge */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#ea580c]/10 to-[#f97316]/10 rounded-2xl py-6 px-8 border border-[#ea580c]/20 max-w-md mx-auto">
            <Icon className="text-3xl text-[#ea580c]" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Starting Price</p>
              <p className="text-2xl font-bold text-[#1a365d] dark:text-white">{service.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mb-4">What We Offer</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive {service.title.toLowerCase()} services designed for reliability and performance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#ea580c]/10 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-[#ea580c] text-sm" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Simple, streamlined process from start to finish</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {service.howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < service.howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#ea580c] to-[#f97316]"></div>
                )}
                <div className="w-20 h-20 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Common questions about {service.title.toLowerCase()}</p>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#ea580c] to-[#f97316]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Ship with {service.title}?</h2>
          <p className="text-xl text-white/80 mb-8">Get a custom quote for your {service.title.toLowerCase()} needs</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#1a365d] text-white font-bold rounded-full hover:bg-[#0f2340] transition-all shadow-lg">
              {service.cta} <FaArrowRight className="ml-2" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#ea580c] transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#1a365d] dark:text-white text-center mb-10">Explore Other Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(services)
              .filter(([key]) => key !== params.service)
              .map(([key, svc]) => (
                <Link key={key} href={`/services/${key}`} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-lg transition-all text-center group">
                  <svc.icon className="text-2xl text-[#ea580c] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-[#1a365d] dark:text-white">{svc.title}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}