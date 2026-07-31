import type { Metadata } from 'next';
import { AdminLoginForm } from '@/components/forms/AdminLoginForm';

export const metadata: Metadata = { title: 'Admin Sign In', robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return <section className="section-space bg-offwhite"><div className="page-shell max-w-md"><p className="eyebrow">TriCore Surgical</p><h1 className="text-3xl font-extrabold">Administrator sign in</h1><p className="mt-3 text-sm leading-6">Use the administrator credentials configured for this site.</p><div className="mt-7"><AdminLoginForm /></div></div></section>;
}

