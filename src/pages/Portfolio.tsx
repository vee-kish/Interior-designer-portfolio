import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

interface Project {
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  size?: 'wide' | 'narrow' | 'square';
}

const fallbackProjects: Project[] = [
  { 
    title: "The Muthaiga Estate", 
    category: "Living Room", 
    location: "Nairobi, KE", 
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    size: "wide"
  },
  { 
    title: "Kilimani Executive", 
    category: "Workspace", 
    location: "Nairobi, KE", 
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800",
    size: "narrow"
  },
  { 
    title: "Serene Sanctuary", 
    category: "Bedroom", 
    location: "Vipingo Ridge, Kilifi", 
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000",
    size: "square"
  },
  { 
    title: "Koffee & Co", 
    category: "Commercial", 
    location: "Westlands, Nairobi", 
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000",
    size: "square"
  },
  { 
    title: "The Reading Corner", 
    category: "Living Room", 
    location: "Runda, Nairobi", 
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800",
    size: "narrow"
  },
  { 
    title: "Modern Monolith", 
    category: "Residential", 
    location: "Karen, Nairobi", 
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
    size: "wide"
  }
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        const docs = querySnapshot.docs.map(doc => doc.data() as Project);
        setProjects(docs.length > 0 ? docs : fallbackProjects);
      } catch (err) {
        console.warn("Portfolio fetch failed, using fallback data", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <header className="mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="display-lg text-primary mb-6"
        >
          Curated Narratives
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-on-surface-variant max-w-2xl leading-relaxed"
        >
          A collection of residential and commercial spaces across Kenya that balance contemporary minimalism with traditional warmth.
        </motion.p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden cursor-pointer rounded-lg",
                p.size === "wide" ? "md:col-span-8" : p.size === "narrow" ? "md:col-span-4" : "md:col-span-6"
              )}
            >
              <div className="h-[500px] md:h-[600px] overflow-hidden">
                <img 
                  loading="lazy"
                  src={p.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={p.title}
                />
              </div>
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12 backdrop-blur-[2px]">
                <span className="label-caps text-secondary-container mb-2">{p.category}</span>
                <h3 className="headline-md text-white">{p.title}</h3>
                <p className="text-white/80">{p.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
