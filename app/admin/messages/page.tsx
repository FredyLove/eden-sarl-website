'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
}

export default function AdminMessagesPage() {
  // Dummy messages for display
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'I love your water service!',
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      message: 'Please expand delivery to Bamenda!',
    },
  ]);

  const deleteMessage = (id: string) => {
    if (confirm('Delete this message?')) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  return (
    <section className="bg-white p-6 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="border p-4 rounded hover:shadow transition relative"
            >
              <p className="font-semibold text-gray-800">{msg.name} ({msg.email})</p>
              <p className="text-gray-700 mt-2">{msg.message}</p>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
