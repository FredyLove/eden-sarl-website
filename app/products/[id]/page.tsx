'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { products } from '../../lib/products';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import toast from 'react-hot-toast';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import { FaArrowLeft, FaCheck, FaShoppingCart, FaStar, FaWhatsapp } from 'react-icons/fa';

export default function ProductDetail() {
  const { language } = useLanguage();
  const t = translations[language];
  const { addToCart } = useCart();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  const details = t.productsDetails[product.id as keyof typeof t.productsDetails];

  return (
    <section className="container mx-auto px-4 py-12 bg-blue-50">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center text-blue-600 font-medium hover:underline gap-2"
      >
        <FaArrowLeft /> {t.back_to_products}
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <FadeIn variant="fadeInLeft">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <div className="h-96 relative">
              <Image
                src={product.image}
                alt={details.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            {product.isPopular && (
              <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center text-sm font-medium">
                <FaCheck className="mr-2" /> {t.popular || "Bestseller"}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Info Section */}
        <FadeIn variant="fadeInRight">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{details.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-gray-600">({product.rating?.toFixed(1) || '4.5'})</span>
            </div>

            <p className="text-3xl text-blue-600 font-bold mb-6">{product.price}</p>
            
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">{details.description}</p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.product_details_title}</h2>
              <ul className="space-y-3">
                {t.product_details_list.map((line, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <FaWhatsapp className="text-xl" />
                {t.place_order}
              </button>
              
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${details.name} ${t.added_to_cart}`, {
                    position: 'bottom-right',
                    style: {
                      background: '#1e40af',
                      color: '#fff'
                    }
                  });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <FaShoppingCart />
                {t.add_to_cart}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}