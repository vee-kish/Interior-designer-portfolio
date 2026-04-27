import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between items-start gap-8 bg-stone-100 border-t border-stone-200">
      <div className="lg:w-1/3">
        <div className="font-serif text-lg font-bold text-primary mb-4">AMANI INTERIORS</div>
        <p className="font-serif text-sm uppercase tracking-widest text-stone-600 mb-6 max-w-xs leading-loose">
          © 2024 AMANI INTERIORS. CRAFTING TIMELESS KENYAN SPACES.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <span className="label-caps text-primary">Connect</span>
        <a href="#" className="font-serif text-sm uppercase tracking-widest text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100">Instagram</a>
        <a href="#" className="font-serif text-sm uppercase tracking-widest text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100">Pinterest</a>
        <a href="#" className="font-serif text-sm uppercase tracking-widest text-stone-600 hover:text-primary transition-opacity opacity-80 hover:opacity-100">LinkedIn</a>
      </div>

      <div className="flex flex-col gap-4">
        <span className="label-caps text-primary">Legal</span>
        <Link to="/privacy" className="font-serif text-sm uppercase tracking-widest text-stone-600 hover:text-primary">Privacy</Link>
        <Link to="/terms" className="font-serif text-sm uppercase tracking-widest text-stone-600 hover:text-primary">Terms</Link>
      </div>

      <div className="flex flex-col gap-4 max-w-xs">
        <span className="label-caps text-primary">Studio</span>
        <p className="font-serif text-sm uppercase tracking-widest text-stone-600">Riverside Drive, Nairobi, Kenya</p>
        <p className="font-serif text-sm uppercase tracking-widest text-stone-600">hello@amaniinteriors.co.ke</p>
      </div>
    </footer>
  );
}
