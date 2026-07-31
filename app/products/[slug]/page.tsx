import type { Metadata } from 'next';
import { ProductDetail } from '@/components/products/ProductDetail';

export const metadata: Metadata = { title: 'Product Details', description: 'Product details and quote requests from TriCore Surgical.' };

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetail slug={params.slug} />;
}

