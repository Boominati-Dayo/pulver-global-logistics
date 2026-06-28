'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ClientLayout';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaBox, FaHeadset, FaInfo, FaEnvelope, FaSearch, FaPlane, FaChevronDown } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isScrolledOrNonHome = !isHomePage || scrolled;

  const navLinks = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/services', label: 'Services', icon: FaBox },
    { href: '/about', label: 'About', icon: FaInfo },
    { href: '/faq', label: 'FAQ', icon: FaHeadset },
    { href: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  const serviceDropdown = [
    { href: '/services/air-freight', label: 'Air Freight' },
    { href: '/services/sea-freight', label: 'Sea Freight' },
    { href: '/services/ground-transport', label: 'Ground Transport' },
    { href: '/services/warehousing', label: 'Warehousing' },
    { href: '/services/express-delivery', label: 'Express Delivery' },
    { href: '/services/pet-transport', label: 'Pet Transport' },
    { href: '/services/valuable-goods', label: 'Valuable Goods' },
    { href: '/services/custom-solutions', label: 'Custom Solutions' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/legal', label: 'Legal' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/fair-chance-act', label: 'Fair Chance Act' },
  ];

  const getNavClasses = () => {
    if (mobileMenuOpen) return 'bg-[#2c00cc] text-white';
    if (isScrolledOrNonHome) return 'bg-white text-[#2c00cc] shadow-xl';
    return 'bg-transparent text-white';
  };

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    const base = 'px-4 py-2 font-medium transition-all duration-300 rounded-full';
    if (isScrolledOrNonHome) {
      return `${base} ${isActive ? 'bg-[#2c00cc] text-white' : 'hover:bg-gray-100 text-gray-700'}`;
    }
    return `${base} ${isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white'}`;
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${getNavClasses()} ${isScrolledOrNonHome ? 'w-[calc(100%-2rem)] max-w-5xl' : 'w-[calc(100%-4rem)] max-w-6xl'}`}
        style={{ borderRadius: '9999px' }}
      >
        <div className="max-w-7xl mx-auto px-2 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="pl-2">
              <Image src="/swiftXpress-logo.png" alt="Pulver Global Logistics" width={140} height={40} className="h-10 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  {link.href === '/services' ? (
                    <div
                      onMouseEnter={() => setActiveDropdown('services')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="relative"
                    >
                      <button className={getLinkClasses(link.href)}>
                        {link.label} <FaChevronDown className="text-xs inline ml-1" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === 'services' && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[220px]"
                          >
                            <div className="space-y-0.5">
                              {serviceDropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={link.href} className={getLinkClasses(link.href)}>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 pr-2">
              <Link
                href="/track"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-lime-500/30 transition-all duration-300 text-sm"
              >
                <FaSearch className="text-xs" />
                Track Package
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden pr-1">
              <Link
                href="/track"
                className="p-2 rounded-xl bg-[#84cc16] text-white"
              >
                <FaSearch size={18} />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors ${isScrolledOrNonHome ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#2c00cc] pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.href === '/services' ? (
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full text-white text-lg font-medium py-4 border-b border-white/10"
                      >
                        <span className="flex items-center gap-3">
                          <link.icon className="text-[#84cc16]" />
                          {link.label}
                        </span>
                        <FaChevronDown className={`text-sm transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-6 pb-2">
                          {serviceDropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => { setMobileMenuOpen(false); setMobileServicesOpen(false); }}
                              className="flex items-center text-white/70 text-base py-2.5 hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-white text-lg font-medium py-4 border-b border-white/10"
                    >
                      <link.icon className="text-[#84cc16]" />
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 px-6 py-4 bg-gradient-to-r from-[#84cc16] to-[#a3e635] text-white font-bold rounded-full text-center"
              >
                Get a Quote
              </Link>
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10 text-xs">
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 bg-white/10 text-white/60 rounded-full hover:bg-white/20 hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}