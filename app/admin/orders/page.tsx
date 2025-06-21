'use client';

import React from 'react';
import { useOrders } from '@/app/context/OrderContext';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';

export default function OrdersPage() {
  const { orders, markDelivered, deleteOrder } = useOrders();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Manage Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-600">
          No orders available.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800 mb-1">
                  {order.customer?.name || 'Unnamed Customer'}
                </h2>
                <p className="text-gray-600">📞 {order.customer?.phone || 'N/A'}</p>
                <p className="text-gray-600">📍 {order.customer?.address || 'N/A'}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Total: XAF {order.total?.toLocaleString()}
                </p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    order.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                  }`}
                >
                  Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>

              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => markDelivered(order.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                  >
                    <FaCheckCircle />
                    Delivered
                  </button>
                )}
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
