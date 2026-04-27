import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Home, Building2, Palette } from 'lucide-react';
import { cn } from '../lib/utils';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
            alt="Luxurious minimalist living room"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75"></div>
        </div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-4xl text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-lg mb-6 leading-[1.05]"
          >
            Transforming Spaces into <span className="italic font-light">Timeless</span> Experiences
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl font-light mb-10 max-w-2xl opacity-90 leading-relaxed"
          >
            Bespoke interior design that balances luxury with comfort. We blend Kenyan heritage with contemporary global aesthetics.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link to="/portfolio" className="bg-primary-container text-white px-8 md:px-10 py-4 label-caps hover:bg-[#234f3b] transition-all text-center">
              View Portfolio
            </Link>
            <Link to="/booking" className="border border-white text-white px-8 md:px-10 py-4 label-caps hover:bg-white/10 transition-all text-center">
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-[120px] px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <span className="label-caps text-secondary">The Amani Philosophy</span>
          <h2 className="headline-xl text-primary">Curating Elegance for the Modern Kenyan Home.</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Founded on the principles of 'Modern African Minimalism', Amani Interiors specializes in creating spaces that breathe. We believe in the power of natural light, raw textures, and purposeful silence.
          </p>
          <div className="pt-4">
            <Link to="/about" className="text-primary label-caps border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all">
              LEARN MORE ABOUT US
            </Link>
          </div>
        </div>
        <div className="relative h-[600px] overflow-hidden rounded-lg shadow-2xl">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=1000" 
            alt="Designer workspace"
          />
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-[120px] bg-stone-100">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="label-caps text-secondary">Gallery</span>
              <h2 className="headline-xl text-primary">Featured Projects</h2>
            </div>
            <Link to="/portfolio" className="label-caps text-primary hover:text-secondary transition-all">SEE ALL WORK</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Muthaiga Villa", cat: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800" },
              { title: "Westlands Suites", cat: "COMMERCIAL", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800", offset: true },
              { title: "The Sanctuary", cat: "STYLING", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800" }
            ].map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={cn(
                  "group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500",
                  p.offset && "md:translate-y-12"
                )}
              >
                <div className="h-[450px] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <span className="label-caps text-stone-400">{p.cat}</span>
                  <h3 className="headline-md text-primary mt-2">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-[120px] px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="label-caps text-secondary">Expertise</span>
          <h2 className="headline-xl text-primary">Tailored Design Solutions</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="border-b lg:border-b-0 lg:border-r border-stone-200 pb-12 lg:pb-0 lg:pr-12">
            <Home className="w-10 h-10 text-secondary mb-6" />
            <h3 className="headline-md text-primary mb-4">Residential Design</h3>
            <p className="text-on-surface-variant leading-relaxed">
              From high-end villas to modern apartments, we create sanctuaries that reflect your personality and heritage.
            </p>
          </div>
          <div className="border-b lg:border-b-0 lg:border-r border-stone-200 pb-12 lg:pb-0 lg:pr-12">
            <Building2 className="w-10 h-10 text-secondary mb-6" />
            <h3 className="headline-md text-primary mb-4">Commercial Interiors</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Elevating brands through strategic spatial planning and aesthetic environments that inspire productivity.
            </p>
          </div>
          <div>
            <Palette className="w-10 h-10 text-secondary mb-6" />
            <h3 className="headline-md text-primary mb-4">Art & Styling</h3>
            <p className="text-on-surface-variant leading-relaxed">
              The final touches that bring a room to life—curating local art, custom furniture, and bespoke textures.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] px-6 text-center bg-primary-container text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="headline-xl mb-8">Ready to define your space?</h2>
          <p className="text-lg mb-12 opacity-80">Let's create something extraordinary together. Our first consultation is a deep dive into your vision.</p>
          <Link to="/booking" className="inline-block bg-secondary-container text-primary-container px-12 py-5 label-caps hover:bg-[#fed65b] transition-all shadow-xl">
            Book a consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
