export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface ProductPayload {
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  featured: boolean;
}

