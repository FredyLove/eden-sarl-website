'use client';

import FadeIn from '@/components/FadeIn';

export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-white">
      <FadeIn variant="fadeInUp">
        <h1 className="text-4xl font-bold mb-12">About Eden SARL</h1>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Our Story */}
        <FadeIn variant="fadeInLeft" delay={0}>
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Story</h2>
            <p className="text-base leading-relaxed">
              Founded in 2010, Eden SARL has grown from a small local water distributor to one of Cameroon&apos;s most trusted sachet water brands. Our mission is simple: provide clean, safe drinking water to communities across the country.
            </p>
            <p className="text-base leading-relaxed mt-4">
              Starting with just one production facility in Douala, we&apos;ve expanded our operations to serve customers in major cities nationwide while maintaining our commitment to quality and affordability.
            </p>
          </div>
        </FadeIn>

        {/* Our Process */}
        <FadeIn variant="fadeInRight" delay={0}>
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Process</h2>
            <ul className="list-disc list-inside space-y-3 text-green-400">
              <li>Water sourced from protected natural springs</li>
              <li>Multi-stage filtration and purification</li>
              <li>UV treatment for complete sterilization</li>
              <li>Automated packaging in hygienic conditions</li>
              <li>Rigorous quality control at every stage</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
