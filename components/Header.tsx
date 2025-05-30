import Link from 'next/link'


export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-800">
          EDEN SARL
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-950 font-bold hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-950 font-bold hover:text-blue-600 transition">
            About Us
          </Link>
          <Link href="/products" className="text-gray-950 font-bold hover:text-blue-600 transition">
            Products
          </Link>
          <Link href="/contact" className="text-gray-950 font-bold hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>

        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}