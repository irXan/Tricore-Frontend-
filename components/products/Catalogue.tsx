'use client';

import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/types/product';
import { ProductFilter } from './ProductFilter';
import { ProductGrid } from './ProductGrid';

export function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((requestError) => {
        setError(axios.isAxiosError(requestError) ? requestError.response?.data?.message || 'The catalogue could not be loaded.' : 'The catalogue could not be loaded.');
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))).sort(), [products]);
  const displayedProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
      return matchesCategory && (!searchTerm || haystack.includes(searchTerm));
    });
  }, [products, category, search]);

  return (
    <section className="section-space bg-offwhite">
      <div className="relative overflow-hidden bg-steel -mx-5 sm:-mx-8 lg:-mx-10 -mt-16 md:-mt-24 mb-12 py-16 md:py-24">
        <div className="blueprint-grid absolute inset-0" />
        <div className="page-shell relative max-w-3xl">
          <p className="eyebrow text-slate-200">Product catalogue</p>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">Equipment and furniture for clinical settings.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-100">Browse our available catalogue, then send an item-specific quote request with your requirements.</p>
        </div>
      </div>
      <div className="page-shell">

        {/* Mobile filter toggle */}
        <div className="mt-8 flex items-center justify-between lg:hidden">
          <p className="text-sm font-bold text-gunmetal">
            {!loading && !error && `${displayedProducts.length} ${displayedProducts.length === 1 ? 'product' : 'products'} available`}
          </p>
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition-colors hover:bg-offwhite"
          >
            {filterOpen ? <X size={16} /> : <SlidersHorizontal size={16} />}
            {filterOpen ? 'Close filters' : 'Filter'}
          </button>
        </div>

        {/* Mobile filter panel — collapses via max-height transition */}
        <div
          className="mt-4 overflow-hidden transition-all duration-300 ease-in-out lg:hidden"
          style={{ maxHeight: filterOpen ? '600px' : '0px', opacity: filterOpen ? 1 : 0 }}
        >
          <ProductFilter
            categories={categories}
            selectedCategory={category}
            search={search}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[17rem_1fr]">
          {/* Desktop sidebar filter — always visible on lg+ */}
          <div className="hidden lg:block">
            <ProductFilter
              categories={categories}
              selectedCategory={category}
              search={search}
              onCategoryChange={setCategory}
              onSearchChange={setSearch}
            />
          </div>

          <div>
            <p className="mb-5 hidden text-sm font-bold text-gunmetal lg:block">
              {!loading && !error && `${displayedProducts.length} ${displayedProducts.length === 1 ? 'product' : 'products'} available`}
            </p>
            {loading && <div className="rounded-xl bg-white p-10 text-center text-gunmetal shadow-card">Loading catalogue…</div>}
            {error && <div role="alert" className="rounded-xl bg-red-50 p-8 text-center text-red-800">{error} Please check the connection and try again.</div>}
            {!loading && !error && <ProductGrid products={displayedProducts} />}
          </div>
        </div>
      </div>
    </section>
  );
}
