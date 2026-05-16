'use client';

import Link from 'next/link';
import { FaPlane } from 'react-icons/fa';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#ea580c] to-[#f97316] rounded-xl flex items-center justify-center shadow-md">
        <FaPlane className="text-white text-lg" />
      </div>
      <div className="hidden sm:block">
        <span className="font-bold text-lg text-[#1a365d]">SXI</span>
        <span className="text-xs block -mt-1 text-gray-500">SwiftXpress Inc.</span>
      </div>
    </Link>
  );
}