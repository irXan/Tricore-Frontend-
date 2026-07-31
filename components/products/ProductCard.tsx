import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { productImageUrl } from '@/lib/api';

export function ProductCard({ product }: { product: Product }) {
  const specLine = Object.entries(product.specs || {}).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join('  ·  ');

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(22,50,79,0.14)]">
      {/* Reticle-trace outline — SVG stroke-dashoffset draws on hover */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full text-steel opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="4"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="400"
          strokeDashoffset="400"
          className="transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.45,0,0.55,1)] group-hover:stroke-dashoffset-0"
        />
      </svg>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-offwhite">
          <Image
            src={productImageUrl(product.images[0])}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Slide-up spec strip from bottom edge */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-navy/95 px-5 py-3 font-mono text-xs leading-5 text-white transition-transform duration-300 ease-[cubic-bezier(0.45,0,0.55,1)] group-hover:translate-y-0">
            {specLine || `${product.brand}`}
          </div>
        </div>
        <div className="p-6">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-steel">{product.brand} · {product.category}</p>
          <h3 className="mt-2 text-xl font-bold text-navy">{product.name}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gunmetal">{product.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-steel">View details <ArrowRight size={16} /></span>
        </div>
      </Link>
    </article>
  );
}
