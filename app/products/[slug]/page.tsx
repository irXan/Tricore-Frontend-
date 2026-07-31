import type { Metadata } from 'next';
import { ProductDetail } from '@/components/products/ProductDetail';
import { Product } from '@/types/product';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tricore-frontend.vercel.app';

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, description: product.description.slice(0, 160) },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
                    { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
                  ],
                },
                {
                  '@type': 'Product',
                  name: product.name,
                  description: product.description,
                  category: product.category,
                  brand: { '@type': 'Brand', name: product.brand },
                  image: product.images?.[0],
                  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', price: 'Contact for pricing' } },
                },
              ],
            }),
          }}
        />
      )}
      <ProductDetail slug={params.slug} />
    </>
  );
}
