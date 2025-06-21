'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/admin" className="text-blue-600 hover:underline">Dashboard</Link>
        <Link href="/admin/products" className="text-blue-600 hover:underline">Products</Link>
        <Link href="/admin/messages" className="text-blue-600 hover:underline">Messages</Link>
        <Link href="/admin/orders" className="text-blue-600 hover:underline">Orders</Link>
      </nav>
    </aside>
  );
}
