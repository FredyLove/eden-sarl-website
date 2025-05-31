'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCheck, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa'

const fadeInUp = {
  hidden: { opacity: 0, y: 30},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {delay: i * 0.2, duration: 0.6},
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Pure Water, Healthy Life
      </h1>
      <p className="text-xl mb-8">
        Eden SARL delivers premium quality sachet water to your doorstep across Cameroon
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
          Order Now
        </button>
        <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
          Learn More
        </button>
      </div>
    </motion.div>
  </div>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-500 opacity-90"></div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Eden Water?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-3xl mb-4 text-blue-600" />,
                title: "Quality Certified",
                description: "Our water meets all national quality standards"
              },
              {
                icon: <FaLeaf className="text-3xl mb-4 text-green-600" />,
                title: "Pure & Natural" ,
                description: "Sourced from protected natural springs"
              },
              {
                icon: <FaTruck className="text-3xl mb-4 text-orange-500" />,
                title: "Fast Delivery",
                description: "Reliable delivery to your location"
              },
              {
                icon: <FaCheck className="text-3xl mb-4 text-blue-600" />,
                title: "Affordable",
                description: "Premium quality at competitive prices"
              }
            ].map((feature, index) => (
              <motion.div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={index}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-center mb-12 text-gray-800"
          variants={fadeInUp}
          initial={{opacity: 0, y: 20}}
          whileInView="visible"
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.6}}
          >
            Our Products
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Standard Pack",
                description: "30 sachets of 500ml pure water",
                price: "XAF 1,500"
              },
              {
                name: "Family Pack",
                description: "60 sachets of 500ml pure water",
                price: "XAF 2,800"
              },
              {
                name: "Bulk Order",
                description: "Custom quantities for businesses",
                price: "Contact for pricing"
              }
            ].map((product, index) => (
              <motion.div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={index}
              >
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <Image 
                    src="/eden-sarl-website/public/icons/1.png" 
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-blue-600 font-bold">{product.price}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          >
            What Our Customers Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Eden water has been our family's choice for years. Always fresh and reliable.",
                author: "Marie T., Douala"
              },
              {
                quote: "The quality is consistent and the delivery is always on time. Great service!",
                author: "Jean P., Yaoundé"
              },
              {
                quote: "As a restaurant owner, I trust Eden for my water supply. My customers love it.",
                author: "Samuel K., Bafoussam"
              }
            ].map((testimonial, index) => (
              <motion.div key={index} className="bg-gray-50 p-6 rounded-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true , amount: 0.4}}
              custom={index}
              >
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-800">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-blue-700 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true , amount: 0.4}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Eden Water?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers across Cameroon
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Place Your Order Today
          </button>
        </div>
      </motion.section>
    </>
  )
}