'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const { cart } = useCart();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setMenuOpen(false);
      setAccountOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              EDEN SARL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/', label: t.home },
              { href: '/about', label: t.about },
              { href: '/products', label: t.products },
              { href: '/contact', label: t.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive(link.href) ? 'text-blue-600' : ''
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block">
              <select
                onChange={(e) => setLanguage(e.target.value as any)}
                value={language}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
            </div>

            {/* Cart */}
            <Link href="/cart" className="p-2 relative rounded-full hover:bg-gray-50 transition-colors">
              <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setAccountOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
              </button>

              {mounted && accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {t.login}
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {t.register}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { href: '/', label: t.home },
              { href: '/about', label: t.about },
              { href: '/products', label: t.products },
              { href: '/contact', label: t.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <select
                onChange={(e) => setLanguage(e.target.value as any)}
                value={language}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t.login}
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                {t.register}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}