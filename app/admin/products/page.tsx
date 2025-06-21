'use client';

import { products } from '@/app/lib/products';
import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-blue-600 font-bold mb-4">{product.price}</p>
            <div className="flex space-x-4">
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
