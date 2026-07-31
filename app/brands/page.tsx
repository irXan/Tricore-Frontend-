import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = { title: 'Brand Partners', description: 'Explore the medical brands distributed by TriCore Surgical.' };

const partners = [
  { name: 'Atom Medical', description: 'Clinical equipment solutions for specialised care environments and the teams that support them.' },
  { name: 'LifeCare Medical', description: 'Medical equipment selected for practical healthcare delivery and day-to-day clinical use.' },
  { name: 'Yuwell', description: 'A recognised name in healthcare devices and patient care equipment for facility and professional needs.' },
  { name: 'UCheck', description: 'Testing and diagnostic product solutions supporting informed care and clinical workflows.' },
  { name: 'LifeChek', description: 'Accessible health monitoring products for professional and point-of-care requirements.' },
];

export default function BrandsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-16 text-center md:py-24"><div className="blueprint-grid absolute inset-0" /><div className="page-shell relative max-w-3xl"><p className="eyebrow text-slate-200">Brands &amp; partners</p><h1 className="text-4xl font-extrabold text-white md:text-5xl">Products supported by established healthcare brands.</h1><p className="mt-6 text-lg leading-8 text-slate-100">TriCore Surgical distributes selected product ranges from partners that healthcare buyers know and trust.</p></div></section>
      <section className="section-space"><div className="page-shell"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{partners.map((partner) => <Card key={partner.name} className="flex min-h-64 flex-col p-7"><div className="flex h-20 items-center border-b border-slate-200"><p className="font-heading text-2xl font-extrabold tracking-tight text-navy">{partner.name}</p></div><p className="mt-6 text-sm leading-7 text-gunmetal">{partner.description}</p><p className="mt-auto pt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-steel">Distributed by TriCore Surgical</p></Card>)}</div><div className="mt-12 rounded-xl bg-steel p-8 text-center text-white"><h2 className="text-2xl font-bold text-white">Looking for a specific brand or model?</h2><p className="mx-auto mt-3 max-w-2xl text-slate-200">Send the details you have and we will help direct your quotation request.</p><ButtonLink href="/quote" variant="light" className="mt-6">Request a Quote</ButtonLink></div></div></section>
    </>
  );
}

