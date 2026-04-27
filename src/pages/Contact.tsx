import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Design',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', service: 'Residential Design', message: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'leads');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <header className="mb-20">
        <span className="label-caps text-secondary mb-4 block">Start a Conversation</span>
        <h1 className="display-lg text-primary">Let's create your sanctuary.</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h3 className="headline-md text-primary mb-6">Our Studio</h3>
            <div className="flex items-start gap-4 text-on-surface-variant leading-relaxed">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <p>Amani Interiors Design Hub<br/>9th Floor, Westlands Terrace<br/>Nairobi, Kenya</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-secondary" />
              <a href="mailto:hello@amaniinteriors.co.ke" className="text-lg hover:text-secondary transition-colors">hello@amaniinteriors.co.ke</a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-secondary" />
              <a href="tel:+254700000000" className="text-lg hover:text-secondary transition-colors">+254 700 000 000</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-8 md:p-12 shadow-xl border border-stone-100 rounded-lg">
          {success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="bg-emerald-50 text-emerald-700 p-8 rounded-lg">
                <h3 className="headline-md mb-4">Thank You!</h3>
                <p>Your message has been received. Our team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 label-caps border-b border-emerald-700 pb-1"
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative border-b border-outline-variant py-2 focus-within:border-secondary transition-colors">
                  <label className="label-caps text-on-surface-variant block mb-2" htmlFor="name">Name</label>
                  <input 
                    required
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg" 
                    id="name" placeholder="How should we address you?"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="relative border-b border-outline-variant py-2 focus-within:border-secondary transition-colors">
                  <label className="label-caps text-on-surface-variant block mb-2" htmlFor="email">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg" 
                    id="email" placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative border-b border-outline-variant py-2 focus-within:border-secondary transition-colors">
                  <label className="label-caps text-on-surface-variant block mb-2" htmlFor="phone">Phone Number</label>
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg" 
                    id="phone" placeholder="+254 --- --- ---"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="relative border-b border-outline-variant py-2 focus-within:border-secondary transition-colors">
                  <label className="label-caps text-on-surface-variant block mb-2" htmlFor="service">Service Interest</label>
                  <select 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg appearance-none" 
                    id="service"
                    value={form.service}
                    onChange={e => setForm({...form, service: e.target.value})}
                  >
                    <option>Residential Design</option>
                    <option>Commercial Spaces</option>
                    <option>Consultation Only</option>
                    <option>Custom Furniture</option>
                  </select>
                </div>
              </div>

              <div className="relative border-b border-outline-variant py-2 focus-within:border-secondary transition-colors">
                <label className="label-caps text-on-surface-variant block mb-2" htmlFor="message">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg resize-none" 
                  id="message" placeholder="Tell us about your project aspirations..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                disabled={loading}
                className="w-full md:w-auto px-16 py-5 bg-primary text-white label-caps hover:bg-[#234f3b] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                type="submit"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
