import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products } from '../../lib/products'


export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) return notFound()

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-64 relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-6">{product.price}</p>
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="space-y-2">
              <li>✔ Purified through reverse osmosis</li>
              <li>✔ UV treated for complete sterilization</li>
              <li>✔ Hygienically packaged</li>
              <li>✔ 100% recyclable materials</li>
            </ul>
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full">
            Place Order
          </button>
        </div>
      </div>
    </section>
  )
}

// Same products array as above