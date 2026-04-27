import { motion } from 'motion/react';
import { Target, Lightbulb, PenTool } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-[120px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 pr-8">
          <span className="label-caps text-secondary mb-6 block">Our Founder</span>
          <h1 className="display-lg text-primary mb-12">The heart behind the <span className="italic text-secondary">Amani</span> aesthetic.</h1>
          <div className="space-y-8 max-w-2xl text-lg text-on-surface-variant leading-relaxed">
            <p>
              Growing up in the vibrant landscapes of Nairobi, I was surrounded by a rich tapestry of textures—from the earthy tones of the Rift Valley to the intricate geometric patterns of traditional Maasai beadwork. My journey began with a simple observation: our homes are the silent narrators of our success and heritage.
            </p>
            <p>
              After refining my craft in London's design houses, I returned to Kenya with a singular vision: to marry the disciplined minimalism of European modernism with the soulful warmth of Kenyan craftsmanship. Amani Interiors was born from this synthesis.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
              alt="Amani Wanjiku - Lead Designer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 shadow-xl hidden md:block">
            <p className="headline-md text-primary leading-tight">Amani Wanjiku</p>
            <p className="label-caps text-secondary">Lead Designer & Founder</p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="label-caps text-secondary mb-4 block">Our Philosophy</span>
            <h2 className="headline-xl text-primary mb-8">Functional Elegance</h2>
            <div className="w-24 h-px bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Target className="w-8 h-8"/>, title: "Intentional Minimalism", desc: "Stripping away the noise to let the essential beauty of form and material speak. Every piece in our designs serves a purpose." },
              { icon: <Lightbulb className="w-8 h-8"/>, title: "Tactile Heritage", desc: "Integrating raw Kenyan materials—wood, sisal, and stone—to create a sense of grounded luxury that feels like home." },
              { icon: <PenTool className="w-8 h-8"/>, title: "Disciplined Craft", desc: "Merging architectural precision with artisan craftsmanship to ensure that beauty never compromises daily functionality." }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-sm border border-stone-200/50 hover:shadow-lg transition-all">
                <div className="text-primary mb-6">{p.icon}</div>
                <h3 className="headline-md text-[24px] text-primary mb-4">{p.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
