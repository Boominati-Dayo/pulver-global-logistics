'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { router.push('/admin'); }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Login successful! Redirecting...');
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        toast.error(data.error || 'Login failed. Please check your credentials.');
      }
    } catch { toast.error('Connection error.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a365d] to-[#0f2340] px-4">
      <ToastContainer position="top-center" autoClose={4000} />
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/swiftXpress-logo-icon.png" alt="SwiftXpress Inc." width={56} height={56} className="w-14 h-14 rounded-2xl" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#ea580c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-[#ea580c] text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-1">Access the SXI admin dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none transition-all" placeholder="admin@swiftxpressinc.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent outline-none transition-all" placeholder="Enter password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              {isLoading ? <><FaSpinner className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center"><Link href="/" className="text-sm text-[#ea580c] hover:underline">← Back to Home</Link></div>
        </div>
      </div>
    </div>
  );
}