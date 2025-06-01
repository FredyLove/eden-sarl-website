'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EDEN SARL</h3>
            <p className="text-blue-100">{t.footer_description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer_quick_links}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-blue-100 hover:text-white transition">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="/products" className="text-blue-100 hover:text-white transition">
                  {t.products}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-100 hover:text-white transition">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer_contact_title}</h4>
            <address className="not-italic text-blue-100">
              <p>{t.footer_location}</p>
              <p>{t.footer_phone}</p>
              <p>{t.footer_email}</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Eden SARL. {t.footer_rights}</p>
        </div>
      </div>
    </footer>
  );
}
