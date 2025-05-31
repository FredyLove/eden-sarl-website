'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { products } from '../../lib/products';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';

export default function ProductDetail() {


  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <section className="container mx-auto px-4 py-12">
      
      <Link href="/products"
      className='mb-8 inline-flex items-center text-blue-600 font-medium hover:underline'
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <FadeIn variant="fadeInLeft">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="h-64 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </FadeIn>

        {/* Info */}
        <FadeIn variant="fadeInRight">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-blue-600 font-bold mb-6">{product.price}</p>
            <p className="text-gray-700 mb-8">{product.description}</p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <ul className="space-y-2 text-green-600">
                <li>✔ Purified through reverse osmosis</li>
                <li>✔ UV treated for complete sterilization</li>
                <li>✔ Hygienically packaged</li>
                <li>✔ 100% recyclable materials</li>
              </ul>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full">
              Place Order
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
