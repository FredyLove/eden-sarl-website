'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                EDEN SARL
              </h3>
            </Link>
            <p className="text-blue-200 leading-relaxed">
              {t.footer_description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t.footer_quick_links}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-blue-200 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="w-1 h-1 mt-2.5 mr-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                  {t.about}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-blue-200 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="w-1 h-1 mt-2.5 mr-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                  {t.products}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-blue-200 hover:text-white transition-colors duration-300 flex items-start"
                >
                  <span className="w-1 h-1 mt-2.5 mr-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t.footer_contact_title}
            </h4>
            <address className="not-italic text-blue-200 space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <p>{t.footer_location}</p>
              </div>
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <p>{t.footer_phone}</p>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <p>{t.footer_email}</p>
              </div>
            </address>
          </div>

          {/* Newsletter/Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t.footer_newsletter_title || "Stay Updated"}
            </h4>
            <p className="text-blue-200">
              {t.footer_newsletter_text || "Subscribe to our newsletter for updates."}
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder={t.footer_email_placeholder || "Your email"} 
                className="flex-1 px-4 py-2 rounded-lg bg-blue-800 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-300"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300"
              >
                {t.footer_subscribe || "Subscribe"}
              </button>
            </form>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-4.123 0-2.43-.013-2.784-.06-3.808-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 0115.45 2.525c.636-.247 1.363-.416 2.427-.465C18.901 2.013 19.256 2 21.685 2h.63c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63zm-.81 7.46l4.665-3.215a1 1 0 011.54.843v6.43a1 1 0 01-1.54.843l-4.665-3.215a1 1 0 010-1.685z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} EDEN SARL. {t.footer_rights || "All rights reserved."}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy" className="text-blue-300 hover:text-white transition-colors text-sm">
              {t.footer_privacy || "Privacy Policy"}
            </Link>
            <Link href="/terms" className="text-blue-300 hover:text-white transition-colors text-sm">
              {t.footer_terms || "Terms of Service"}
            </Link>
            <Link href="/cookies" className="text-blue-300 hover:text-white transition-colors text-sm">
              {t.footer_cookies || "Cookie Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}