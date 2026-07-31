import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return <section className="section-space bg-offwhite"><div className="page-shell max-w-2xl text-center"><p className="font-heading text-7xl font-extrabold text-steel">404</p><h1 className="mt-4 text-4xl font-extrabold">This page is not available.</h1><p className="mt-5 leading-7">The page may have moved, or the address may be incorrect. Return to the catalogue or send us a product enquiry.</p><div className="mt-8 flex justify-center gap-3"><ButtonLink href="/products">View Products</ButtonLink><Link href="/contact" className="inline-flex items-center px-4 font-heading text-sm font-bold text-steel hover:text-navy">Contact TriCore</Link></div></div></section>;
}

