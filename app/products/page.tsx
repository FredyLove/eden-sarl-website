'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '../lib/products';
import FadeIn from '@/components/FadeIn';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import { FaCartPlus, FaEye, FaStar } from 'react-icons/fa';

export default function ProductsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const { addToCart } = useCart();

  return (
    <section className="container mx-auto px-4 py-12 bg-blue-100 to-white">
      <FadeIn variant="fadeInUp">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">{t.products_title}</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => {
          const translation = t.productsDetails[product.id as keyof typeof t.productsDetails];

          return (
            <FadeIn key={product.id} variant="fadeInLeft" delay={index * 0.1}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Product Image */}
                <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-50 relative flex items-center justify-center p-6">
                  <Image
                    src={product.image}
                    alt={translation.name}
                    width={200}
                    height={200}
                    className="object-contain h-full"
                  />
                  {product.isPopular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <FaStar className="mr-1" /> {t.popular}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {translation.name}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 min-h-[3rem]">
                    {translation.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar className="text-gray-300" />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <FaEye /> {t.view_details}
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${translation.name} ${t.added_to_cart}`, {
                          position: 'bottom-right',
                          style: {
                            background: '#1e40af',
                            color: '#fff'
                          }
                        });
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <FaCartPlus /> {t.add_to_cart}
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}