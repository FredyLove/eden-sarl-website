'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity, getTotal } = useCart();
  const { language } = useLanguage();
  const t = translations[language];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} ${t.removed_from_cart}`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success(t.cart_cleared);
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaShoppingBag className="text-blue-600" />
            {t.cart_title}
          </h1>
          <Link href="/products" className="text-blue-600 hover:underline flex items-center gap-1">
            <FaArrowLeft size={14} /> {t.continue_shopping}
          </Link>
        </div>

        {!isClient ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">{t.cart_empty}</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t.browse_products}
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-blue-50 transition"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-blue-600 font-bold">{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-red-600 hover:text-red-800 p-2 transition"
                      aria-label={t.remove}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">{t.order_summary}</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                >
                  <FaTrash size={12} /> {t.clear_cart}
                </button>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600">{t.subtotal}</span>
                <span className="font-medium">XAF {getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600">{t.delivery}</span>
                <span className="font-medium">{t.free_delivery || 'Free'}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-semibold text-gray-800">{t.total}</span>
                <span className="text-xl font-bold text-blue-600">
                  XAF {getTotal().toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-6 rounded-lg font-medium mt-6 transition shadow-md hover:shadow-lg"
              >
                {t.proceed_to_checkout}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}