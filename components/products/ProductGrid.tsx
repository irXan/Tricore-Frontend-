import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-gunmetal">No products match your current search. Please adjust the filters or send us an inquiry for assistance.</div>;
  }

  return <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>;
}

