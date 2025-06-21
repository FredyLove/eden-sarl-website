'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('New product:', form);
    alert('Product created (mock only). Check console.');
    
    router.push('/admin/products');
  };

  return (
    <section className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product ID (slug)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          rows={3}
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
    </section>
  );
}
