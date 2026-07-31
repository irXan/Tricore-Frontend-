'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CircleCheck as CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { getProduct, productImageUrl } from '@/lib/api';
import type { Product } from '@/types/product';

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product>();
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setActiveImage(0);
    getProduct(slug)
      .then(setProduct)
      .catch((requestError) => {
        if (axios.isAxiosError(requestError) && requestError.response?.status === 404) setError('not-found');
        else setError('We could not load this product. Please try again shortly.');
      });
  }, [slug]);

  if (error === 'not-found') {
    return <section className="section-space bg-offwhite"><div className="page-shell max-w-2xl text-center"><h1 className="text-4xl font-extrabold">Product not found</h1><p className="mt-4">This catalogue item is not available at this address.</p><ButtonLink href="/products" className="mt-7">Return to Products</ButtonLink></div></section>;
  }
  if (error) return <section className="section-space bg-offwhite"><div role="alert" className="page-shell text-center text-red-800">{error}</div></section>;
  if (!product) return <section className="section-space bg-offwhite"><div className="page-shell text-center">Loading product…</div></section>;

  const images = product.images.length ? product.images : ['/product-placeholder.svg'];
  const specs = Object.entries(product.specs || {});
  return (
    <section className="section-space bg-offwhite">
      <div className="page-shell">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-navy"><ArrowLeft size={16} />Back to catalogue</Link>
        <div className="mt-7 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-card"><Image src={productImageUrl(images[activeImage])} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" /></div>
            {images.length > 1 && <div className="mt-4 flex gap-3 overflow-x-auto pb-1">{images.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 ${index === activeImage ? 'border-steel' : 'border-transparent'}`} aria-label={`View image ${index + 1} of ${product.name}`}><Image src={productImageUrl(image)} alt="" fill sizes="80px" className="object-cover" /></button>)}</div>}
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-steel">{product.brand} · {product.category}</p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{product.name}</h1>
            <p className="mt-6 leading-8 text-gunmetal">{product.description}</p>
            <ButtonLink href={`/quote?item=${encodeURIComponent(product.name)}`} className="mt-8">Request Quote for This Item</ButtonLink>
            <div className="mt-10 rounded-xl bg-white p-6 shadow-card"><p className="font-heading text-lg font-bold text-navy">Product specifications</p>{specs.length ? <dl className="mt-5 divide-y divide-slate-200">{specs.map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[0.8fr_1.2fr]"><dt className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gunmetal">{label}</dt><dd className="text-sm text-navy">{value}</dd></div>)}</dl> : <p className="mt-4 text-sm leading-6">Contact us for detailed specifications and availability.</p>}</div>
            <p className="mt-5 flex gap-2 text-sm leading-6 text-gunmetal"><CheckCircle2 size={18} className="shrink-0 text-steel" />Include required quantities and any delivery timing in your quote request for a more precise response.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

