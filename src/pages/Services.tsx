import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const packages = [
  {
    name: "Basic Consultation",
    price: "KSh 15,000",
    desc: "A focused intensive session to refine your vision and solve spatial challenges.",
    features: ["90-Minute Session", "Digital Mood Board", "Color Palette", "Furniture Layout Guide"],
    cta: "Book Consultation"
  },
  {
    name: "Design Concept",
    price: "KSh 75,000",
    desc: "Comprehensive visual roadmap for clients who enjoy managing their own execution.",
    features: ["3D Photo-realistic Renders", "Detailed Lighting Plan", "Material Schedule", "Sourcing List"],
    cta: "Start Concept",
    popular: true
  },
  {
    name: "Full Transformation",
    price: "Custom Quote",
    desc: "A complete turnkey solution from conceptualization to white-glove installation.",
    features: ["Full Design Drawings", "Project Management", "Bespoke Procurement", "Site Supervision"],
    cta: "Enquire Now"
  }
];

export default function ServicesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <header className="text-center max-w-3xl mx-auto mb-24">
        <span className="label-caps text-secondary mb-6 block">Our Expertise</span>
        <h1 className="display-lg text-primary mb-8">Design that speaks of heritage and modern elegance.</h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          We offer specialized interior design services tailored to the discerning Kenyan lifestyle, blending functional intelligence with tactile luxury.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-[120px]">
        {packages.map((pkg, i) => (
          <div 
            key={i} 
            className={cn(
              "p-8 md:p-10 flex flex-col h-full rounded-lg border transition-all duration-500",
              pkg.popular 
                ? "bg-primary-container text-white border-primary-container shadow-2xl lg:scale-105 z-10" 
                : "bg-white border-stone-200 text-primary hover:shadow-xl",
              i === 2 && "md:col-span-2 lg:col-span-1"
            )}
          >
            {pkg.popular && <span className="label-caps text-secondary-container mb-4 text-[10px]">MOST POPULAR</span>}
            <h3 className="headline-md mb-2">{pkg.name}</h3>
            <p className={`mb-8 ${pkg.popular ? "text-white/80" : "text-on-surface-variant"}`}>{pkg.desc}</p>
            
            <div className="mb-10">
              <span className={`text-sm opacity-60 block ${pkg.popular ? "text-white" : ""}`}>Starting at</span>
              <span className="headline-xl">{pkg.price}</span>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              {pkg.features.map((f, j) => (
                <li key={j} className="flex gap-3 items-center text-sm">
                  <Check className={`w-4 h-4 ${pkg.popular ? "text-secondary-container" : "text-secondary"}`} />
                  <span className={pkg.popular ? "text-white/90" : "text-on-surface"}>{f}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/booking"
              className={`w-full py-4 text-center label-caps border transition-all ${
                pkg.popular 
                  ? "bg-secondary-container text-primary-container border-secondary-container hover:bg-[#fed65b]" 
                  : "border-primary text-primary hover:bg-stone-50"
              }`}
            >
              {pkg.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="bg-stone-100 p-12 md:p-20 rounded-lg text-center">
        <h2 className="headline-xl text-primary mb-8">Need something bespoke?</h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
          Every space is unique. If our standard packages don't fit your vision, we are happy to craft a tailored proposal for your commercial or residential project.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 label-caps text-primary border-b border-primary pb-1 group">
          GET A CUSTOM QUOTE
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </main>
  );
}
