'use client';

import { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import FadeIn from '@/components/FadeIn';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <FadeIn variant="fadeInUp">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <FadeIn variant="fadeInLeft">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            {submitted ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                Thank you! Your message has been sent. We'll contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        {/* Contact Details */}
        <FadeIn variant="fadeInRight">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Location</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Headquarters</h3>
                    <p className="text-gray-600">123 Water Street, Douala, Cameroon</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+237 XXX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">contact@eden-sarl.cm</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-64 bg-gray-200 rounded-lg">
                <div className="flex items-center justify-center h-full text-gray-800">
                  Map would display here
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
