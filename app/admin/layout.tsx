'use client';

import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 text-blue-700 font-medium">
          <Link href="/admin" className="hover:underline cursor-pointer">Dashboard</Link>
          <Link href="/admin/products" className="hover:underline cursor-pointer">Products</Link>
          <Link href="/admin/messages" className="hover:underline cursor-pointer">Messages</Link>
          <Link href="/admin/orders" className="hover:underline cursor-pointer">Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
