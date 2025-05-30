export default function AboutPage() {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-white">About Eden SARL</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Story</h2>
              <p className="text-amber-50 mb-6">
                Founded in 2010, Eden SARL has grown from a small local water distributor to one of Cameroon's most trusted sachet water brands. Our mission is simple: provide clean, safe drinking water to communities across the country.
              </p>
              <p className="text-amber-50 mb-6">
                Starting with just one production facility in Douala, we've expanded our operations to serve customers in major cities nationwide while maintaining our commitment to quality and affordability.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Process</h2>
              <ul className="space-y-4">
                {[
                  "Water sourced from protected natural springs",
                  "Multi-stage filtration and purification",
                  "UV treatment for complete sterilization",
                  "Automated packaging in hygienic conditions",
                  "Rigorous quality control at every stage"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }