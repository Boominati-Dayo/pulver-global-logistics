'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaSearch, FaCompass, FaArrowRight, FaBox, FaMap, FaPlane } from 'react-icons/fa';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a365d] via-[#0f2340] to-[#1a365d] flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#ea580c]/10 rounded-full blur-[100px] transition-all duration-1000 ease-out" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ea580c]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#2c5282]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto py-12">
        <div className="relative mb-10">
          <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] via-white to-[#ea580c] tracking-tighter drop-shadow-2xl" style={{ textShadow: '0 0 100px rgba(234,88,12,0.3)' }}>404</h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <FaCompass className="text-white/5 animate-spin-slow" style={{ animationDuration: '30s' }} size={150} />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#ea580c]/30 to-[#f97316]/30 rounded-full mx-auto mb-8 border border-white/10">
            <FaPlane className="text-[#ea580c] text-5xl animate-bounce-slow" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Shipment Off the Grid</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Like a package without a valid tracking number, this page seems to have gone off the grid. Let&apos;s get you back on track.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <Link href="/" className="group flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl">
              <FaHome className="text-2xl" /> <span className="text-lg">Back to Home</span> <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/track" className="group flex items-center justify-center gap-4 px-8 py-5 bg-white/10 text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all backdrop-blur">
              <FaSearch className="text-2xl" /> <span className="text-lg">Track a Package</span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[{ href: '/services', label: 'Services', icon: FaPlane }, { href: '/about', label: 'About Us', icon: FaMap }, { href: '/contact', label: 'Contact', icon: FaBox }].map((link) => (
              <Link key={link.href} href={link.href} className="group flex items-center gap-2 px-5 py-3 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all border border-white/10 hover:border-white/30 backdrop-blur">
                <link.icon className="text-xs" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
      `}</style>
    </div>
  );
}