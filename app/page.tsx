import Link from 'next/link';
import { ArrowRight, Building2, ClipboardCheck, Grid3x3, Handshake, Package, Stethoscope, Truck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeroHeadline } from '@/components/ui/HeroHeadline';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StatCounter } from '@/components/ui/StatCounter';
import { ProcurementPanel } from '@/components/ui/ProcurementPanel';
import { TMark } from '@/components/ui/TMark';

const categories = [
  { title: 'General surgical equipment', description: 'Core equipment selected for clinical workflows and surgical environments.', icon: Stethoscope },
  { title: 'Hospital furniture', description: 'Functional furniture solutions for wards, clinics, and treatment areas.', icon: Building2 },
  { title: 'Patient monitoring & care', description: 'Reliable devices supporting day-to-day patient observation and care.', icon: ClipboardCheck },
];

const brands = ['Atom Medical', 'LifeCare Medical', 'Yuwell', 'UCheck', 'LifeChek'];

const stats = [
  { value: 14, suffix: '+', label: 'Catalogued products', icon: Package },
  { value: 5, suffix: '', label: 'Partner brands', icon: Handshake },
  { value: 6, suffix: '', label: 'Product categories', icon: Grid3x3 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
        <div className="blueprint-grid absolute inset-0" />
        <TMark className="tmark-watermark right-6 top-6 h-20 w-20 text-white" />
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <HeroHeadline
              eyebrow="Surgical equipment & hospital furniture"
              headline="Dependable equipment for the people who deliver care."
              subtext="TriCore Surgical supplies wholesale and retail healthcare providers with carefully selected general surgical equipment, hospital furniture, and essential clinical products."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="light">Request a Quote <ArrowRight size={17} className="ml-2" /></ButtonLink>
              <ButtonLink href="/products" variant="outline-light">Browse Products</ButtonLink>
            </div>
          </div>
          <ProcurementPanel />
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-slate-200 bg-offwhite py-14">
        <div className="page-shell">
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-slate-300">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="md:px-8">
                    <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} icon={<Icon size={26} strokeWidth={1.5} />} />
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Catalogue preview */}
      <section className="section-space bg-offwhite">
        <div className="page-shell">
          <ScrollReveal>
            <p className="eyebrow">Our catalogue</p>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Solutions for essential clinical spaces</h2>
              <Link href="/products" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-steel hover:text-navy">View the catalogue <ArrowRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <Icon size={30} className="text-steel" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gunmetal">{description}</p>
              </Card>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Brands strip */}
      <section className="section-space bg-white">
        <div className="page-shell text-center">
          <ScrollReveal>
            <p className="eyebrow">Distributed brands</p>
            <h2 className="text-3xl font-bold">Established partners. Focused supply.</h2>
          </ScrollReveal>
          {/* TODO: Replace with official brand logo assets once provided by client */}
          <div className="mt-10 grid grid-cols-2 border-y border-slate-200 md:grid-cols-5">
            {brands.map((brand) => (
              <Link
                key={brand}
                href="/brands"
                className="flex min-h-28 items-center justify-center border-b border-slate-200 px-3 text-center font-heading text-base font-bold text-gunmetal transition-all duration-200 hover:-translate-y-1 hover:text-steel md:border-b-0 md:border-r last:md:border-r-0"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why TriCore */}
      <section className="section-space bg-offwhite">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <p className="eyebrow">Why TriCore</p>
            <h2 className="text-3xl font-bold md:text-4xl">A practical partner for every requirement.</h2>
          </ScrollReveal>
          <ScrollReveal stagger className="grid gap-7 sm:grid-cols-3">
            <div><Truck className="text-steel" /><h3 className="mt-4 text-lg font-bold">Broad supply scope</h3><p className="mt-2 text-sm leading-6">Equipment and furniture sourcing in one clear conversation.</p></div>
            <div><ClipboardCheck className="text-steel" /><h3 className="mt-4 text-lg font-bold">Responsive quotations</h3><p className="mt-2 text-sm leading-6">Tell us the item, quantity, and timing; we will guide the next step.</p></div>
            <div><Building2 className="text-steel" /><h3 className="mt-4 text-lg font-bold">Healthcare focused</h3><p className="mt-2 text-sm leading-6">A catalogue and partner network designed around clinical settings.</p></div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-steel py-16 text-white">
        <div className="blueprint-grid absolute inset-0" />
        <TMark className="tmark-watermark right-6 bottom-6 h-16 w-16 text-white" />
        <div className="page-shell relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-heading text-3xl font-bold">Need pricing or product guidance?</p>
            <p className="mt-2 text-slate-100">Send your requirements and our team will respond with the relevant next steps.</p>
          </div>
          <ButtonLink href="/quote" variant="light" className="shrink-0">Request a Quote</ButtonLink>
        </div>
      </section>
    </>
  );
}
