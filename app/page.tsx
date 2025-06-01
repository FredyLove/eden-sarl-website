'use client';

import React, { useRef } from 'react';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import { FaCheck, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import { useRouter } from 'next/navigation';
import './hero.css';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const productRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-container relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 text-white py-22 md:py-20 overflow-hidden">
        {/* Water ripple effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white animate-ripple"></div>
          <div className="absolute top-1/3 right-1/3 w-56 h-56 rounded-full bg-white animate-ripple animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full bg-white animate-ripple animation-delay-4000"></div>
        </div>

        {/* Floating water drops */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn variant="zoomIn">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t.hero_title_part1} <span className="text-shadow-cyan-50">{t.hero_title_part2}</span>,<br />
                {t.hero_title_part3} <span className="text-blue-5">{t.hero_title_part4}</span>
              </h1>
            </FadeIn>

            <FadeIn variant="fadeInUp" delay={0.3}>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-lg mx-auto leading-relaxed">
                {t.hero_subtitle}
              </p>
            </FadeIn>

            <FadeIn variant="fadeInUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/products')}
                  className="relative overflow-hidden group bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                    {t.order_now}
                  </span>
                </button>
                <button
                  onClick={() => router.push('/about')}
                  className="border-2 border-blue-300 text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                  {t.learn_more}
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
        <style jsx>{`
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(4); opacity: 0; }
          }
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          .animate-ripple { animation: ripple 6s linear infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn variant="zoomIn">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t.why_choose}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[t.feature_1, t.feature_2, t.feature_3, t.feature_4].map((feature, index) => {
              const icons = [<FaShieldAlt className="text-3xl mb-4 text-blue-600" />,
              <FaLeaf className="text-3xl mb-4 text-green-600" />,
              <FaTruck className="text-3xl mb-4 text-orange-500" />,
              <FaCheck className="text-3xl mb-4 text-blue-600" />];
              return (
                <FadeIn key={index} variant="zoomIn" delay={index}>
                  <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition">
                    <div className="flex justify-center">{icons[index]}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section ref={productRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn variant="fadeInLeft">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t.our_products}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home_products.map((product, index) => (
              <FadeIn key={index} variant="fadeInLeft" delay={index}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-48 bg-blue-100 flex items-center justify-center">
                    <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-blue-600 font-bold">{product.price}</p>
                    <button onClick={() => router.push("/products")} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                      {t.order_now}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn variant="fadeInRight">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              {t.testimonials}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.reviews.map((testimonial, index) => (
              <FadeIn key={index} variant="fadeInRight" delay={index}>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800">— {testimonial.author}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <FadeIn variant="zoomIn">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.cta_title}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{t.cta_subtitle}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Get Started
            </button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
