'use client';

import { useTheme } from './ClientLayout';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gradient-to-br from-[#ea580c] to-[#1a365d] text-white shadow-lg hover:scale-110 transition-transform"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
}