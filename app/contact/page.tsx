import type { Metadata } from 'next';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = { title: 'Contact Us', description: 'Contact TriCore Surgical about surgical equipment and hospital furniture.' };

export default function ContactPage() {
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Verified business address to be added before launch';
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || 'Verified business phone to be added before launch';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const mapEmbedUrl = process.env.NEXT_PUBLIC_MAP_EMBED_URL;

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-16 md:py-24"><div className="blueprint-grid absolute inset-0" /><div className="page-shell relative max-w-3xl"><p className="eyebrow text-slate-200">Contact TriCore</p><h1 className="text-4xl font-extrabold text-white md:text-5xl">Talk to our supply team.</h1><p className="mt-5 text-lg leading-8 text-slate-100">For product questions, quotation requests, or brand availability, contact TriCore Surgical directly or send us a message below.</p></div></section>
      <section className="section-space"><div className="page-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"><div className="grid content-start gap-5"><div className="rounded-xl bg-navy p-6 text-white"><MapPin className="text-steel" /><p className="mt-4 font-heading text-lg font-bold">Address</p><p className="mt-2 text-sm leading-6 text-slate-200">{address}</p></div><div className="rounded-xl bg-offwhite p-6"><Phone className="text-steel" /><p className="mt-4 font-heading text-lg font-bold text-navy">Phone</p><a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="mt-2 block text-sm text-gunmetal hover:text-steel">{phone}</a></div>{whatsapp && <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="rounded-xl bg-steel p-6 text-white transition-colors hover:bg-navy"><MessageCircle /><p className="mt-4 font-heading text-lg font-bold">WhatsApp</p><p className="mt-2 text-sm text-slate-100">Start a direct conversation.</p></a>}</div><ContactForm /></div></section>
      <section className="bg-offwhite pb-16"><div className="page-shell">{mapEmbedUrl ? <iframe title="TriCore Surgical location" src={mapEmbedUrl} className="h-96 w-full rounded-xl border-0 shadow-card" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm leading-6 text-gunmetal">A verified business address and map embed URL are required before this location map can be published.</div>}</div></section>
    </>
  );
}

