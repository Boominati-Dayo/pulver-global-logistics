'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ClientLayout';
import { useSettings } from '@/components/SettingsContext';
import { FaGlobe, FaCheckCircle, FaBox, FaPlane, FaShip, FaTruck, FaWarehouse, FaArrowRight, FaShieldAlt, FaHeadset, FaChartLine, FaStar, FaQuoteLeft, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShippingFast, FaUser, FaAward, FaCertificate, FaMedal, FaHandshake, FaLeaf, FaSearch, FaSpinner, FaPaw, FaRocket, FaBolt, FaCog, FaArrowDown, FaLock, FaMapPin, FaAnchor, FaRoute, FaBoxes, FaCheck } from 'react-icons/fa';

const reviews = [
  { name: "Marcus Thompson", role: "Supply Chain Director", company: "TechFlow Industries", rating: 4, text: "SwiftXpress Inc. transformed our cross-border shipping. Their tracking is real-time and incredibly reliable.", location: "Chicago, IL" },
  { name: "Jennifer Nakamura", role: "Operations Manager", company: "Sakura Electronics", rating: 5, text: "The customs clearance process with SXI is seamless. They handle all documentation professionally.", location: "Los Angeles, CA" },
  { name: "Robert Chen", role: "Import/Export Manager", company: "Pacific Trade Co", rating: 3, text: "Reliable partner for international shipments. Had some delays on one shipment but overall decent service.", location: "Seattle, WA" },
  { name: "Sarah Mitchell", role: "E-commerce Owner", company: "Urban Trends Boutique", rating: 5, text: "As a small business, I need a logistics partner I can trust. SXI delivers every time.", location: "Austin, TX" },
  { name: "David Kowalski", role: "Logistics Coordinator", company: "Midwest Manufacturing", rating: 4, text: "Their warehouse management integration saved us hours of manual work every week.", location: "Detroit, MI" },
  { name: "Amanda Price", role: "CEO", company: "GreenLeaf Organics", rating: 5, text: "SXI's carbon-offset program aligns perfectly with our sustainability commitment.", location: "Portland, OR" },
  { name: "Michael Santos", role: "Procurement Manager", company: "Apex Construction", rating: 3, text: "Heavy equipment shipping requires expertise. Service was decent but communication could be better.", location: "Phoenix, AZ" },
  { name: "Emily Watson", role: "Fulfillment Lead", company: "HomeStyle Decor", rating: 4, text: "Competitive rates and reliable LTL services. SXI is now our go-to logistics partner.", location: "Charlotte, NC" },
  { name: "James Okonkwo", role: "International Sales", company: "AfroTech Solutions", rating: 5, text: "Shipping to 8 African countries is now seamless with SXI's expertise.", location: "Atlanta, GA" },
  { name: "Lisa Fernandez", role: "Pharma Operations", company: "MedCore Pharmaceuticals", rating: 4, text: "Temperature-controlled shipping for medical supplies is critical. SXI delivers most of the time.", location: "Las Vegas, NV" },
  { name: "Kevin O'Brien", role: "Fleet Manager", company: "O'Brien Fresh Foods", rating: 4, text: "Perishable goods need speed and reliability. SXI's refrigerated fleet is modern and dependable.", location: "Boston, MA" },
  { name: "Priya Sharma", role: "Fashion Buyer", company: "Boutique Boulevard", rating: 5, text: "Fashion moves fast, and so does SXI. Same-day delivery is a game-changer.", location: "New York, NY" },
  { name: "Derek Hoffman", role: "Warehouse Manager", company: "Hoffman Distribution", rating: 3, text: "Decent service overall. Had a couple of tracking issues but they resolved them promptly.", location: "Denver, CO" },
  { name: "Michelle Park", role: "Operations Lead", company: "Pacific Commerce", rating: 4, text: "Good partner for small business shipping. Rates are fair and delivery is consistent.", location: "San Francisco, CA" },
  { name: "Carlos Vega", role: "Supply Chain Analyst", company: "Vega Logistics Group", rating: 2, text: "Service was slower than expected during peak season. Not bad but room for improvement.", location: "Houston, TX" },
  { name: "Rachel Kim", role: "Procurement Officer", company: "Metro Supplies Co", rating: 5, text: "Excellent customer service and reliable deliveries. SXI has been a great partner for our business.", location: "Philadelphia, PA" },
];

const renderStars = (rating: number) => (
  Array.from({ length: 5 }, (_, i) => (
    <FaStar key={i} className={`text-sm ${i < rating ? 'text-[#ea580c]' : 'text-gray-300'}`} />
  ))
);



const bentoServices = [
  { icon: FaTruck, title: 'Ground Transport', desc: 'Nationwide coverage with reliable delivery.', href: '/services/ground-transport' },
  { icon: FaPlane, title: 'Air Freight', desc: 'Express air delivery to 50+ countries.', href: '/services/air-freight', highlight: true },
  { icon: FaShip, title: 'Sea Freight', desc: 'Cost-effective ocean cargo solutions.', href: '/services/sea-freight' },
  { icon: FaWarehouse, title: 'Warehousing', desc: 'Secure storage and distribution.', href: '/services/warehousing' },
  { icon: FaBolt, title: 'Express Delivery', desc: 'Same-day and next-day options.', href: '/services/express-delivery' },
  { icon: FaPaw, title: 'Pet Transport', desc: 'Safe pet shipping worldwide.', href: '/services/pet-transport' },
  { icon: FaShieldAlt, title: 'Valuable Goods', desc: 'Insured shipping for precious cargo.', href: '/services/valuable-goods' },
  { icon: FaCog, title: 'Custom Solutions', desc: 'Tailored logistics for your needs.', href: '/services/custom-solutions' },
];

const partnersLogo = [
  { name: 'FedEx', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/fedex.svg' },
  { name: 'Aramex', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/aramex.svg' },
  { name: 'Japan Post', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/japan-post.jpg' },
  { name: 'DTDC', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/dtdc.svg' },
  { name: 'USPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/usps-usa.svg' },
  { name: 'Poste Italiane', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/Others/poste-italiane.svg' },
  { name: 'La Poste', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/la-poste-colissimo-france.svg' },
  { name: 'UPS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/ups.svg' },
  { name: 'DPD', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/dpd.svg' },
  { name: 'GLS', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/gls.svg' },
  { name: 'PostNL', logo: 'https://cdn.ship24.com/assets/images/db/couriers/legacy-logo/postnl-parcel-service-tracking.png' },
];

const deliveryOptions = [
  { icon: FaLock, title: 'Signature Required', desc: 'Proof of delivery with signature capture.' },
  { icon: FaUser, title: 'Adult Signature', desc: 'Require recipient 21+ at delivery.' },
  { icon: FaMapPin, title: 'SXI Access Point', desc: 'Pickup at secure convenient locations.' },
  { icon: FaAnchor, title: 'Hold for Pickup', desc: 'Package held at customer center.' },
  { icon: FaRoute, title: 'Direct Delivery', desc: 'Prevent rerouting to other addresses.' },
  { icon: FaBoxes, title: 'Cash on Delivery', desc: 'Pay upon package receipt.' },
];

export default function Home() {
  const { isDarkMode } = useTheme();
  const { phone } = useSettings();
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setIsTracking(true);
      router.push(`/track?tracking=${encodeURIComponent(trackingNumber)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a365d] via-[#0f2340] to-[#1a365d] min-h-[650px] flex items-center overflow-hidden pt-[120px]">
        <div className="absolute inset-0">
          <img src="/assets/home-hero.webp" alt="SwiftXpress logistics" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/85 via-transparent to-[#0f2340]/80"></div>
        </div>
        <div className="absolute top-24 right-8 w-72 h-72 bg-[#ea580c]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 left-8 w-96 h-96 bg-[#2c5282]/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                SwiftXpress<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f97316]">Inc.</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                Comprehensive logistics solutions worldwide. From air freight to sea cargo, warehousing to express delivery — we move your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/track" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                  <FaSearch className="mr-2" /> Track Package
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-bold mb-2">Quick Tracking</h3>
                <p className="text-white/60 text-sm mb-6">Enter your tracking number</p>
                <form onSubmit={handleQuickTrack} className="space-y-4">
                  <input type="text" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} placeholder="e.g. SXI123456" className="w-full px-5 py-3.5 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-lg" />
                  <button type="submit" disabled={isTracking} className="w-full py-3.5 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    {isTracking ? <FaSpinner className="animate-spin" /> : <FaSearch />} {isTracking ? 'Tracking...' : 'Track Now'}
                  </button>
                </form>
                <p className="text-white/50 text-sm mt-5 text-center">Or call us: <span className="text-[#ea580c] font-bold">{phone}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Marquee */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trusted Shipping Partners</h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 marquee-container" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            {[...partnersLogo, ...partnersLogo].map((partner, index) => (
              <div key={index} className="flex-shrink-0">
                <img src={partner.logo} alt={partner.name} className="h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12', label: 'Countries Served' },
              { value: '3', label: 'Years in Business' },
              { value: '18K+', label: 'Packages Delivered' },
              { value: '9AM-6PM', label: 'Mon-Fri Support' },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-extrabold">{stat.value}</div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Bento Style */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#ea580c] font-semibold text-sm uppercase tracking-wider">Shipping Solutions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mt-2 mb-4">Flexible Shipping Services</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Whether you're shipping across the street or across the world, we have several service options to help you find the right balance of speed and cost.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {bentoServices.map((service, index) => (
              <div key={index} className="group relative rounded-2xl p-7 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl max-md:hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#2c5282] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-[#ea580c]/10 group-hover:bg-white/20 transition-colors duration-300">
                    <service.icon className="text-2xl text-[#ea580c] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
                  <Link href={service.href} className="inline-flex items-center mt-4 text-sm font-medium text-[#ea580c] group-hover:text-white/60 transition-colors duration-300">
                    Learn More <FaArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
            {bentoServices.slice(0, 4).map((service, index) => (
              <div key={`sm-${index}`} className="group relative rounded-2xl p-7 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#2c5282] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-[#ea580c]/10 group-hover:bg-white/20 transition-colors duration-300">
                    <service.icon className="text-2xl text-[#ea580c] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
                  <Link href={service.href} className="inline-flex items-center mt-4 text-sm font-medium text-[#ea580c] group-hover:text-white/60 transition-colors duration-300">
                    Learn More <FaArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
              View All Services <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Asymmetric Layout */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="SXI Logistics" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-extrabold text-white">3+</p>
                <p className="text-white/90 text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
            <div>
              <span className="text-[#ea580c] font-semibold text-sm uppercase tracking-wider">Why Choose SXI</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mt-2 mb-6">
                Your Trusted Logistics Partner Since 2022
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                With 3 years of experience, SwiftXpress Inc. has built a reputation for reliability, transparency, and exceptional service. We connect businesses to global markets with efficiency and care.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: FaClock, title: '24/7 Support', desc: 'Round-the-clock assistance' },
                  { icon: FaShieldAlt, title: 'Fully Insured', desc: 'All shipments protected' },
                  { icon: FaMapMarkerAlt, title: 'Real-Time Tracking', desc: 'GPS monitoring' },
                  { icon: FaRocket, title: 'Fast Delivery', desc: 'On-time guaranteed' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#ea580c]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-[#ea580c]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center mt-8 px-7 py-3.5 bg-[#1a365d] dark:bg-[#ea580c] text-white dark:text-[#1a365d] font-bold rounded-full hover:shadow-lg transition-all">
                Learn About Us <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value-Added Services Banner */}
      <section className="py-16 bg-gradient-to-r from-[#1a365d] to-[#2c5282]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="text-[#ea580c] font-semibold text-sm uppercase tracking-wider">Shipping Protection</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">Get Shipping Insurance & Protection</h2>
              <p className="text-white/70 mb-6 leading-relaxed">Reduce the stress of claims with protection and customizable coverage across all carriers and modes. Porch piracy protection and full insurance coverage included.</p>
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-full hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                Learn More <FaArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <FaShieldAlt className="text-3xl text-[#ea580c] mb-3" />
                <h4 className="text-white font-bold mb-1">InsureShield</h4>
                <p className="text-white/60 text-xs">Shipping protection & risk mitigation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <FaAward className="text-3xl text-[#ea580c] mb-3" />
                <h4 className="text-white font-bold mb-1">ParcelPro</h4>
                <p className="text-white/60 text-xs">Insured high-value shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] dark:text-white mb-3">Delivery Options</h2>
            <p className="text-gray-500 dark:text-gray-400">Add extra security and flexibility to your shipments</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {deliveryOptions.map((service, index) => (
              <div key={index} className="text-center p-5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-600">
                <service.icon className="text-2xl text-[#ea580c] mx-auto mb-3" />
                <h4 className="text-sm font-bold text-[#1a365d] dark:text-white mb-1">{service.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Marquee */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="text-[#ea580c] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] dark:text-white mt-2 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Trusted by businesses worldwide</p>
        </div>
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-5 marquee-container">
            {[...reviews, ...reviews].map((review, index) => (
              <div key={index} className="flex-shrink-0 w-[370px] bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-3">{renderStars(review.rating)}</div>
                <FaQuoteLeft className="text-[#ea580c]/30 text-2xl mb-3" />
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm min-h-[60px]">"{review.text}"</p>
                <div className="flex items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.role}, {review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-600">
            <span className="text-2xl font-bold text-[#ea580c] mr-2">4.2</span>
            <div className="flex mr-2">{renderStars(4)}</div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Based on 180+ reviews</span>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#ea580c] to-[#f97316]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Ship with Us?</h2>
          <p className="text-xl text-white/80 mb-8">Experience the SXI difference today</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#1a365d] text-white font-bold rounded-full hover:bg-[#0f2340] transition-all shadow-lg">
              Get Started Now <FaArrowRight className="ml-2" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#ea580c] transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}