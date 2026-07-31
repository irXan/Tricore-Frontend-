'use client';

import axios from 'axios';
import { Check, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { deleteProduct, getInquiries, getProducts, saveProduct, updateInquiryStatus } from '@/lib/api';
import { isUnauthorized } from '@/lib/auth';
import { formatDate, slugify } from '@/lib/utils';
import type { Inquiry } from '@/types/inquiry';
import type { Product, ProductPayload } from '@/types/product';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().trim().min(2, 'Product name is required.').max(160),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only.'),
  category: z.string().trim().min(2, 'Category is required.').max(100),
  brand: z.string().trim().min(2, 'Brand is required.').max(100),
  description: z.string().trim().min(10, 'Add a fuller product description.').max(5000),
  specs: z.record(z.string().min(1), z.string().min(1)),
  images: z.array(z.string()).max(8),
  featured: z.boolean(),
});

type EditorForm = Omit<ProductPayload, 'specs'> & { specsText: string };
const blankForm: EditorForm = { name: '', slug: '', category: '', brand: '', description: '', specsText: '{}', images: [], featured: false };

function productToForm(product: Product): EditorForm {
  return { name: product.name, slug: product.slug, category: product.category, brand: product.brand, description: product.description, specsText: JSON.stringify(product.specs, null, 2), images: product.images, featured: product.featured };
}

function errorMessage(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.data?.message || 'The requested action could not be completed.' : 'The requested action could not be completed.';
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [form, setForm] = useState<EditorForm>(blankForm);
  const [files, setFiles] = useState<File[]>([]);
  const [editingId, setEditingId] = useState<string>();
  const [formError, setFormError] = useState('');
  const [pageError, setPageError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadDashboard = async () => {
    try {
      const [catalogue, receivedInquiries] = await Promise.all([getProducts(), getInquiries()]);
      setProducts(catalogue);
      setInquiries(receivedInquiries);
    } catch (error) {
      if (isUnauthorized(error)) router.replace('/admin/login');
      else setPageError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadDashboard(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setField = <K extends keyof EditorForm>(field: K, value: EditorForm[K]) => setForm((current) => ({ ...current, [field]: value }));
  const startNew = () => { setEditingId(undefined); setFiles([]); setForm(blankForm); setFormError(''); };
  const startEdit = (product: Product) => { setEditingId(product._id); setFiles([]); setForm(productToForm(product)); setFormError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    let specs: Record<string, string>;
    try {
      const parsed = JSON.parse(form.specsText);
      if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error();
      specs = Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, String(value)]));
    } catch {
      setFormError('Specifications must be a valid JSON object, for example {"Width": "60 cm"}.');
      return;
    }

    const validation = productSchema.safeParse({ ...form, specs });
    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Please correct the product details.');
      return;
    }

    setSaving(true);
    try {
      const saved = await saveProduct(validation.data, files, editingId);
      setProducts((current) => editingId ? current.map((item) => item._id === saved._id ? saved : item) : [saved, ...current]);
      startNew();
    } catch (error) {
      if (isUnauthorized(error)) router.replace('/admin/login');
      else setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async (product: Product) => {
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) return;
    try {
      await deleteProduct(product._id);
      setProducts((current) => current.filter((item) => item._id !== product._id));
      if (editingId === product._id) startNew();
    } catch (error) {
      if (isUnauthorized(error)) router.replace('/admin/login');
      else setPageError(errorMessage(error));
    }
  };

  const markHandled = async (inquiry: Inquiry) => {
    try {
      const updated = await updateInquiryStatus(inquiry._id, 'handled');
      setInquiries((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (error) {
      if (isUnauthorized(error)) router.replace('/admin/login');
      else setPageError(errorMessage(error));
    }
  };

  if (loading) return <section className="section-space bg-offwhite"><div className="page-shell">Loading secure dashboard…</div></section>;
  if (pageError) return <section className="section-space bg-offwhite"><div role="alert" className="page-shell text-red-800">{pageError}</div></section>;

  return (
    <section className="section-space bg-offwhite">
      <div className="page-shell">
        <p className="eyebrow">Administrator</p><h1 className="text-4xl font-extrabold">Catalogue & inquiry dashboard</h1><p className="mt-3">Manage listed products and respond to incoming requirements.</p>
        <Card className="mt-8 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold">{editingId ? 'Edit product' : 'Add product'}</h2>{editingId && <Button type="button" variant="secondary" onClick={startNew}>Cancel edit</Button>}</div>
          <form onSubmit={handleSave} className="mt-6">
            <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-bold text-navy">Product name<Input value={form.name} onChange={(e) => { setField('name', e.target.value); if (!editingId) setField('slug', slugify(e.target.value)); }} required /></label><label className="text-sm font-bold text-navy">URL slug<Input value={form.slug} onChange={(e) => setField('slug', slugify(e.target.value))} required /></label><label className="text-sm font-bold text-navy">Category<Input value={form.category} onChange={(e) => setField('category', e.target.value)} placeholder="e.g. Hospital furniture" required /></label><label className="text-sm font-bold text-navy">Brand<Input value={form.brand} onChange={(e) => setField('brand', e.target.value)} required /></label></div>
            <label className="mt-5 block text-sm font-bold text-navy">Description<Textarea rows={4} value={form.description} onChange={(e) => setField('description', e.target.value)} required /></label>
            <div className="mt-5 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold text-navy">Specifications (JSON)<Textarea rows={7} value={form.specsText} onChange={(e) => setField('specsText', e.target.value)} spellCheck={false} required /></label><div><label className="text-sm font-bold text-navy">Product images <span className="font-normal text-gunmetal">(JPEG, PNG, WebP or GIF; max 5MB each)</span><Input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} /></label><p className="mt-2 text-xs leading-5 text-gunmetal">{form.images.length ? `${form.images.length} existing image(s) will be retained.` : 'No existing images. A supplied image will become the primary product image.'}</p><label className="mt-5 flex items-center gap-2 text-sm font-bold text-navy"><input type="checkbox" checked={form.featured} onChange={(e) => setField('featured', e.target.checked)} className="h-4 w-4 accent-steel" />Feature on catalogue</label></div></div>
            {formError && <p role="alert" className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-800">{formError}</p>}
            <Button type="submit" disabled={saving} className="mt-6">{saving ? 'Saving…' : <><Upload size={17} className="mr-2" />{editingId ? 'Save product' : 'Create product'}</>}</Button>
          </form>
        </Card>

        <div className="mt-12 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Products</h2><Button type="button" onClick={startNew} className="min-h-0 px-3 py-2"><Plus size={16} className="mr-1" />New product</Button></div><div className="mt-5 overflow-x-auto rounded-xl bg-white shadow-card"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-navy text-white"><tr><th className="px-4 py-3 font-heading">Product</th><th className="px-4 py-3 font-heading">Category</th><th className="px-4 py-3 font-heading">Brand</th><th className="px-4 py-3 font-heading">Actions</th></tr></thead><tbody>{products.length ? products.map((product) => <tr key={product._id} className="border-b border-slate-100 last:border-0"><td className="px-4 py-4 font-bold text-navy">{product.name}{product.featured && <span className="ml-2 rounded bg-offwhite px-2 py-1 text-xs text-steel">Featured</span>}</td><td className="px-4 py-4">{product.category}</td><td className="px-4 py-4">{product.brand}</td><td className="px-4 py-4"><div className="flex gap-2"><button type="button" onClick={() => startEdit(product)} className="rounded p-2 text-steel hover:bg-offwhite" aria-label={`Edit ${product.name}`}><Pencil size={17} /></button><button type="button" onClick={() => void removeProduct(product)} className="rounded p-2 text-red-700 hover:bg-red-50" aria-label={`Delete ${product.name}`}><Trash2 size={17} /></button></div></td></tr>) : <tr><td colSpan={4} className="px-4 py-8 text-center text-gunmetal">No products have been added yet.</td></tr>}</tbody></table></div></div>
          <div><h2 className="text-2xl font-bold">Inquiries</h2><div className="mt-5 grid gap-4">{inquiries.length ? inquiries.map((inquiry) => <Card key={inquiry._id} className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-heading text-lg font-bold text-navy">{inquiry.name}</h3><p className="text-sm text-gunmetal">{inquiry.company || 'No company supplied'} · {formatDate(inquiry.createdAt)}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${inquiry.status === 'handled' ? 'bg-green-50 text-green-800' : 'bg-offwhite text-steel'}`}>{inquiry.status}</span></div><div className="mt-4 space-y-1 text-sm"><p><span className="font-bold text-navy">Email:</span> <a className="text-steel hover:text-navy" href={`mailto:${inquiry.email}`}>{inquiry.email}</a></p>{inquiry.phone && <p><span className="font-bold text-navy">Phone:</span> {inquiry.phone}</p>}<p><span className="font-bold text-navy">Items:</span> {inquiry.items.length ? inquiry.items.join(', ') : 'Not specified'}</p>{inquiry.message && <p className="pt-2 leading-6">{inquiry.message}</p>}</div>{inquiry.status === 'new' && <Button type="button" variant="secondary" onClick={() => void markHandled(inquiry)} className="mt-5 min-h-0 px-3 py-2"><Check size={16} className="mr-1" />Mark handled</Button>}</Card>) : <Card className="p-6 text-sm text-gunmetal">No inquiries have been received yet.</Card>}</div></div>
        </div>
      </div>
    </section>
  );
}

