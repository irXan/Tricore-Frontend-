import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Handshake, Target, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = { title: 'About Us', description: 'Learn about TriCore Surgical and its clinical equipment supply approach.' };

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-steel py-16 md:py-24"><div className="blueprint-grid absolute inset-0" /><div className="page-shell relative max-w-4xl"><p className="eyebrow text-slate-200">About TriCore Surgical</p><h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">A focused source for clinical equipment and healthcare furniture.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">TriCore Surgical serves wholesale and retail buyers seeking dependable general surgical equipment and hospital furniture. Our role is to make product discovery and quote requests direct, informed, and responsive.</p></div></section>
      <section className="section-space"><div className="page-shell grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Our approach</p><h2 className="text-3xl font-bold">Procurement support without unnecessary complexity.</h2><p className="mt-5 leading-8">Healthcare facilities have specific requirements: the right product, the right specification, and clear information before purchase. We organise our catalogue around those needs and work with recognised partners to support informed sourcing decisions.</p><p className="mt-4 leading-8">Whether the request is for a single item or an equipment list, TriCore provides a practical point of contact for product and quotation enquiries.</p></div><div className="grid gap-5"><Card className="p-6"><Target className="text-steel" /><h3 className="mt-4 text-xl font-bold">Mission</h3><p className="mt-2 leading-7">To help healthcare providers access appropriate equipment and furniture through responsive, professional supply support.</p></Card><Card className="p-6"><ShieldCheck className="text-steel" /><h3 className="mt-4 text-xl font-bold">Standards</h3><p className="mt-2 leading-7">A clinically minded, clear, and dependable experience from product review through quote request.</p></Card></div></div></section>
      <section className="section-space bg-offwhite"><div className="page-shell"><div className="max-w-2xl"><p className="eyebrow">Brand partnerships</p><h2 className="text-3xl font-bold">A catalogue backed by trusted names.</h2><p className="mt-4 leading-7">Our range includes products associated with Atom Medical, LifeCare Medical, Yuwell, UCheck, and LifeChek. Explore our partners or send a detailed product requirement to discuss availability.</p></div><div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/brands">Explore Brand Partners <ArrowRight size={16} className="ml-2" /></ButtonLink><Link href="/quote" className="inline-flex items-center font-heading text-sm font-bold text-steel hover:text-navy">Discuss a requirement</Link></div><Handshake className="mt-12 text-steel" size={44} /></div></section>
    </>
  );
}

