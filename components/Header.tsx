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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link href="/" className="text-2xl font-bold text-blue-800">
          EDEN SARL
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {[
            { href: '/', label: t.home },
            { href: '/about', label: t.about },
            { href: '/products', label: t.products },
            { href: '/contact', label: t.contact },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bold transition ${
                isActive(link.href) ? 'text-blue-600' : 'text-gray-950 hover:text-blue-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-4">
            <label htmlFor="language-select" className="sr-only">
              {t.selectLanguage}
            </label>
            <select
              id="language-select"
              onChange={(e) => setLanguage(e.target.value as any)}
              value={language}
              className="text-sm px-3 py-1 rounded border border-gray-300 bg-gray-50 hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="en">EN English</option>
              <option value="fr">FR Français</option>
            </select>
          </div>

          <div className="relative ml-2">
            <Link href="/cart">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:bg-blue-100 hover:border-blue-400 transition relative">
                <ShoppingCartIcon className="w-5 h-5 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <div className="relative ml-4">
            <div
              onClick={() => setAccountOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:bg-blue-100 hover:border-blue-400 transition cursor-pointer"
            >
              <UserIcon className="w-5 h-5 text-gray-700" />
            </div>

            {mounted && accountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {t.login}
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {t.register}
                </Link>
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-sm absolute top-full left-0 w-full z-40">
          <nav className="flex flex-col p-4 space-y-2">
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
                className={`py-2 px-4 rounded hover:bg-blue-50 font-medium ${
                  isActive(link.href) ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2 px-4 rounded hover:bg-blue-50 font-medium text-gray-800"
            >
              {t.login}
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="py-2 px-4 rounded hover:bg-blue-50 font-medium text-gray-800"
            >
              {t.register}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
