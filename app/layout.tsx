import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eden SARL - Premium Sachet Water in Cameroon',
  description: 'Eden SARL delivers the purest sachet water to homes and businesses across Cameroon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-900 text-blue-900`}>
        <LanguageProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Toaster position="top-center" />
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
