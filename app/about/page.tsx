'use client';

import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import Image from 'next/image';
import { FaLeaf, FaTint, FaShieldAlt, FaAward, FaCheck } from 'react-icons/fa';

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/water-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn variant="fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.about_title}</h1>
            <p className="text-xl max-w-2xl">{t.about_subtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Our Story */}
          <FadeIn variant="fadeInLeft">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">
                <FaLeaf className="inline mr-3 text-green-500" />
                {t.about_story_title}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  {t.about_story_paragraph1}
                </p>
                <p className="text-lg leading-relaxed">
                  {t.about_story_paragraph2}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn variant="fadeInRight">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-factory.jpg"
                alt={t.about_image_alt}
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Our Process */}
        <div className="mt-24">
          <FadeIn variant="fadeInUp">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
              <FaTint className="inline mr-3 text-blue-500" />
              {t.about_process_title}
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {t.about_process_steps.map((step, index) => (
              <FadeIn key={index} variant="fadeInUp" delay={index * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <FaTint className="text-2xl text-blue-600" />}
                    {index === 1 && <FaShieldAlt className="text-2xl text-blue-600" />}
                    {index === 2 && <FaAward className="text-2xl text-blue-600" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mt-24 bg-blue-50 rounded-xl p-12">
          <FadeIn variant="fadeInUp">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
              {t.about_mission_title}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn variant="fadeInLeft">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  {t.about_mission_subtitle}
                </h3>
                <p className="text-gray-700">{t.about_mission_content}</p>
              </div>
            </FadeIn>
            <FadeIn variant="fadeInRight">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  {t.about_values_subtitle}
                </h3>
                <ul className="space-y-3">
                  {t.about_values_list.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}