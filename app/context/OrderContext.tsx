'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'delivered';
  location?: { lat: number; lng: number };
  items: CartItem[];
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  markDelivered: (id: string) => void;
  deleteOrder: (id: string) => void;
};

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
};


const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const markDelivered = (id: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: 'delivered' } : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, markDelivered, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
}
