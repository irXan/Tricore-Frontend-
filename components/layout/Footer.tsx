import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { TMark } from '@/components/ui/TMark';

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || 'Business phone to be confirmed';

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="blueprint-grid absolute inset-0" />
      <TMark className="tmark-watermark right-6 top-6 h-20 w-20 text-white" />
      <div className="page-shell relative grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div>
          <p className="font-heading text-2xl font-extrabold tracking-tight">TRICORE SURGICAL</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
            A wholesale and retail distributor of dependable general surgical equipment and hospital furniture.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-steel">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-200">
            <Link href="/about" className="hover:text-white">About TriCore</Link>
            <Link href="/products" className="hover:text-white">Product catalogue</Link>
            <Link href="/brands" className="hover:text-white">Brand partners</Link>
            <Link href="/quote" className="hover:text-white">Request a quote</Link>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-steel">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-200">
            <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 hover:text-white"><Phone size={16} />{phone}</a>
            <Link href="/contact" className="flex items-center gap-2 hover:text-white"><Mail size={16} />Send an inquiry</Link>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <div className="page-shell py-5 text-xs text-slate-300">© {new Date().getFullYear()} TriCore Surgical. All rights reserved.</div>
      </div>
    </footer>
  );
}

