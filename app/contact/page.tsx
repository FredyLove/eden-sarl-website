'use client';

import { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import Image from 'next/image';

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/water-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn variant="fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact_title}</h1>
            <p className="text-xl max-w-2xl">{t.contact_subtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeIn variant="fadeInLeft">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                {t.contact_form_title}
              </h2>

              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {t.contact_thank_you}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      {t.form_name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      {t.form_email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      {t.form_message}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">{t.sending}</span>
                    ) : (
                      <>
                        <FaPaperPlane />
                        {t.send_message}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Contact Details */}
          <FadeIn variant="fadeInRight">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-blue-800 mb-6">
                  {t.our_location}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{t.contact_address_title}</h3>
                      <p className="text-gray-600 mt-1">{t.contact_address_value}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{t.contact_phone_title}</h3>
                      <p className="text-gray-600 mt-1">{t.contact_phone_value}</p>
                      <a 
                        href={`https://wa.me/${t.contact_phone_value.replace(/\D/g, '')}`}
                        className="inline-flex items-center mt-2 text-green-600 hover:text-green-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="mr-2" />
                        {t.chat_on_whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{t.contact_email_title}</h3>
                      <p className="text-gray-600 mt-1">{t.contact_email_value}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="h-80 relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/map-placeholder.jpg"
                    alt={t.map_placeholder}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition">
                      {t.view_on_map}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}