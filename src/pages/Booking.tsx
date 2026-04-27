import { useState } from 'react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Calendar, Clock, CheckCircle, ChevronRight, Home, Building2, Palette } from 'lucide-react';
import { cn } from '../lib/utils';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

const services = [
  { id: 'residential', name: 'Residential Design', icon: <Home className="w-6 h-6"/>, price: 'KSh 15,000' },
  { id: 'commercial', name: 'Commercial Styling', icon: <Building2 className="w-6 h-6"/>, price: 'Custom' },
  { id: 'consult', name: 'Virtual Consultation', icon: <Palette className="w-6 h-6"/>, price: 'KSh 5,000' }
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    serviceId: '',
    date: '',
    time: '',
    customerName: '',
    customerEmail: '',
    location: 'Nairobi',
    budget: '',
    brief: '',
    status: 'pending'
  });

  const handleBooking = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'bookings');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-32 px-6 text-center">
        <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-8" />
        <h2 className="display-lg text-primary mb-4">Request Sent</h2>
        <p className="text-lg text-on-surface-variant mb-12">
          Your consultation request has been received. We'll contact you shortly to confirm the scheduled time and provide payment instructions (M-Pesa).
        </p>
        <button onClick={() => window.location.href = '/'} className="bg-primary-container text-white px-12 py-4 label-caps">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-12 py-20">
      <header className="mb-20 text-center">
        <span className="label-caps text-secondary mb-4 block">Reservation</span>
        <h1 className="display-lg text-primary mb-6">Begin Your Design Journey</h1>
        <p className="text-lg opacity-60">East Africa Time (EAT)</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Service */}
          <div className={cn("p-8 bg-white border border-stone-200 rounded-lg", step !== 1 && "opacity-50 pointer-events-none")}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="headline-md text-xl">Select Service</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => setForm({...form, serviceId: s.id})}
                  className={cn(
                    "p-6 border rounded-lg text-left transition-all",
                    form.serviceId === s.id ? "border-secondary bg-stone-50" : "border-stone-200"
                  )}
                >
                  <div className="text-secondary mb-3">{s.icon}</div>
                  <div className="font-bold mb-1">{s.name}</div>
                  <div className="text-xs text-stone-400">{s.price}</div>
                </button>
              ))}
            </div>
            {step === 1 && form.serviceId && (
              <button 
                onClick={() => setStep(2)}
                className="mt-8 w-full bg-primary text-white py-4 label-caps flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Step 2: Date & Time */}
          <div className={cn("p-8 bg-white border border-stone-200 rounded-lg", step !== 2 && "opacity-50 pointer-events-none")}>
             <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="headline-md text-xl">Date & Time</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="label-caps opacity-60">Date</label>
                <input 
                  type="date" 
                  className="w-full border-stone-200 p-3 rounded"
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="label-caps opacity-60">Time Slot</label>
                <select 
                  className="w-full border-stone-200 p-3 rounded"
                  value={form.time}
                  onChange={e => setForm({...form, time: e.target.value})}
                >
                  <option value="">Choose a slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:30">04:30 PM</option>
                </select>
              </div>
            </div>
            {step === 2 && (
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 border border-stone-200 py-4 label-caps"
                >
                  Back
                </button>
                <button 
                  disabled={!form.date || !form.time}
                  onClick={() => setStep(3)}
                  className="flex-[2] bg-primary text-white py-4 label-caps flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Personal Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Details */}
          <div className={cn("p-8 bg-white border border-stone-200 rounded-lg", step !== 3 && "opacity-50 pointer-events-none")}>
             <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-sm font-bold">3</span>
              <h2 className="headline-md text-xl">Final Details</h2>
            </div>
            <div className="space-y-6">
              <input 
                placeholder="Full Name" 
                className="w-full border-stone-200 p-3 rounded"
                value={form.customerName}
                onChange={e => setForm({...form, customerName: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full border-stone-200 p-3 rounded"
                value={form.customerEmail}
                onChange={e => setForm({...form, customerEmail: e.target.value})}
              />
              <textarea 
                placeholder="Brief project description..." 
                rows={4}
                className="w-full border-stone-200 p-3 rounded resize-none"
                value={form.brief}
                onChange={e => setForm({...form, brief: e.target.value})}
              ></textarea>
            </div>
            {step === 3 && (
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 border border-stone-200 py-4 label-caps"
                >
                  Back
                </button>
                <button 
                  disabled={loading || !form.customerName || !form.customerEmail}
                  onClick={handleBooking}
                  className="flex-[2] bg-primary text-white py-4 label-caps disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Request"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <aside className="lg:col-span-4 self-start">
          <div className="bg-primary-container text-white p-8 rounded-lg">
            <h3 className="font-serif text-xl mb-6">Booking Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="opacity-60 uppercase label-caps">Service</span>
                <span className="font-bold">{services.find(s => s.id === form.serviceId)?.name || '---'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="opacity-60 uppercase label-caps">Date</span>
                <span className="font-bold">{form.date || '---'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="opacity-60 uppercase label-caps">Time</span>
                <span className="font-bold">{form.time || '---'}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="opacity-60 uppercase label-caps">Fee</span>
                <span className="font-bold text-secondary-container text-lg">
                  {services.find(s => s.id === form.serviceId)?.price || '---'}
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded text-xs leading-relaxed opacity-60">
              Payments are handled via M-Pesa. A representative will contact you to provide the Till Number once the request is reviewed.
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
