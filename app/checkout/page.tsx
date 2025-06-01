'use client';

import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/app/context/LanguageContext';
import { translations } from '@/app/lib/translations';
import { FaMapMarkerAlt, FaPhone, FaUser, FaShoppingBag, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import toast from 'react-hot-toast';
import FadeIn from '@/components/FadeIn';

const Map = dynamic(() => import('@/components/MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
    <p>Loading map...</p>
  </div>
});

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash' as 'cash' | 'mobile'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = {
        customer: form,
        location,
        items: cart,
        total: getTotal(),
        date: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Order placed:', order);
      
      toast.success(t.order_success, {
        duration: 4000,
        position: 'bottom-right',
        icon: <FaCheckCircle className="text-green-500" />
      });
      clearCart();
    } catch (error) {
      toast.error(t.order_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FadeIn variant="fadeInUp">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
            <FaShoppingBag className="text-5xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.empty_cart_title}</h2>
            <p className="text-gray-600 mb-6">{t.empty_cart_message}</p>
            <a
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {t.browse_products}
            </a>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <FadeIn variant="fadeInUp">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-800">{t.checkout_title}</h1>
          <p className="text-lg text-gray-600 mb-8">{t.checkout_subtitle}</p>
        </FadeIn>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left: Customer Info */}
          <FadeIn variant="fadeInLeft">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <div className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    {t.personal_info}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-1">{t.full_name}</label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-1">{t.phone_number}</label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    {t.delivery_info}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-gray-700 mb-1">{t.address}</label>
                      <input
                        type="text"
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">{t.select_location}</label>
                      <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                        <Map onSelect={setLocation} />
                      </div>
                      {location && (
                        <p className="mt-2 text-sm text-green-600 flex items-center">
                          <MdLocationOn className="mr-1" />
                          {t.location_selected}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-500" />
                    {t.payment_method}
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={form.paymentMethod === 'cash'}
                        onChange={() => setForm({ ...form, paymentMethod: 'cash' })}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{t.cash_on_delivery}</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={form.paymentMethod === 'mobile'}
                        onChange={() => setForm({ ...form, paymentMethod: 'mobile' })}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{t.mobile_payment}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!location || isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 ${
                    !location || isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">{t.processing_order}</span>
                  ) : (
                    <>
                      <FaCheckCircle />
                      {t.place_an_order}
                    </>
                  )}
                </button>
              </div>
            </form>
          </FadeIn>

          {/* Right: Order Summary */}
          <FadeIn variant="fadeInRight">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md h-fit sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaShoppingBag className="text-blue-500" />
                {t.order_summary}
              </h2>

              <ul className="space-y-4 mb-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{item.price}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t.subtotal_checkout}</span>
                  <span>XAF {getTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t.delivery_fee}</span>
                  <span>{t.free}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-blue-600 mt-2">
                  <span>{t.total_checkout}</span>
                  <span>XAF {getTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}