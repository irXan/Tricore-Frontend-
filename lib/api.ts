import axios from 'axios';
import type { Inquiry, InquiryInput } from '@/types/inquiry';
import type { Product, ProductPayload } from '@/types/product';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export function productImageUrl(image?: string) {
  if (!image) return '/product-placeholder.svg';
  if (image === '/product-placeholder.svg') return image;
  if (image.startsWith('http')) return image;
  return `${API_ORIGIN}${image}`;
}

export async function getProducts(params?: Record<string, string>) {
  const { data } = await api.get<{ products: Product[] }>('/products', { params });
  return data.products;
}

export async function getProduct(slug: string) {
  const { data } = await api.get<{ product: Product }>(`/products/${slug}`);
  return data.product;
}

export async function submitInquiry(inquiry: InquiryInput) {
  const { data } = await api.post<{ message: string; inquiryId: string }>('/inquiries', inquiry);
  return data;
}

export async function login(email: string, password: string) {
  return api.post<{ admin: { email: string } }>('/auth/login', { email, password });
}

export async function getInquiries() {
  const { data } = await api.get<{ inquiries: Inquiry[] }>('/inquiries');
  return data.inquiries;
}

export async function saveProduct(payload: ProductPayload, files: File[], productId?: string) {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('slug', payload.slug);
  formData.append('category', payload.category);
  formData.append('brand', payload.brand);
  formData.append('description', payload.description);
  formData.append('specs', JSON.stringify(payload.specs));
  formData.append('images', JSON.stringify(payload.images));
  formData.append('featured', String(payload.featured));
  files.forEach((file) => formData.append('newImages', file));

  const request = productId
    ? api.put<{ product: Product }>(`/products/${productId}`, formData)
    : api.post<{ product: Product }>('/products', formData);
  const { data } = await request;
  return data.product;
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`);
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']) {
  const { data } = await api.patch<{ inquiry: Inquiry }>(`/inquiries/${id}`, { status });
  return data.inquiry;
}
