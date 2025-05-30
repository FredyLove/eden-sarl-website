export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EDEN SARL</h3>
            <p className="text-blue-100">
              Providing clean, safe drinking water to communities across Cameroon.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-100 hover:text-white transition">About Us</a></li>
              <li><a href="/products" className="text-blue-100 hover:text-white transition">Our Products</a></li>
              <li><a href="/contact" className="text-blue-100 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-blue-100">
              <p>Douala, Cameroon</p>
              <p>Phone: +237 XXX XXX XXX</p>
              <p>Email: info@eden-sarl.cm</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Eden SARL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}