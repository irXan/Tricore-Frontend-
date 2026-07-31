import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata: Metadata = { title: 'Request a Quote', description: 'Send TriCore Surgical your equipment requirement for a tailored quotation.' };

export default function QuotePage() {
  return (
    <section className="section-space bg-offwhite"><div className="page-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">Request a quote</p><h1 className="text-4xl font-extrabold md:text-5xl">Tell us what you need.</h1><p className="mt-5 leading-8">Send your equipment or furniture requirements, preferred brand, quantity, and any timing considerations. Our team will review the request and respond directly.</p><div className="mt-8 border-l-2 border-steel pl-4 text-sm leading-6">There is no online checkout. Every requirement is reviewed before a quotation is prepared.</div></div><Suspense fallback={<div className="rounded-xl bg-white p-8 shadow-card">Loading form…</div>}><QuoteForm /></Suspense></div></section>
  );
}