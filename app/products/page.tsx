import type { Metadata } from 'next';
import { Catalogue } from '@/components/products/Catalogue';

export const metadata: Metadata = { title: 'Products', description: 'Browse TriCore Surgical equipment and hospital furniture catalogue.' };

export default function ProductsPage() {
  return <Catalogue />;
}

