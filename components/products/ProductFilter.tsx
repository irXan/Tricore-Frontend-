'use client';

import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  search: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

export function ProductFilter({ categories, selectedCategory, search, onCategoryChange, onSearchChange }: ProductFilterProps) {
  return (
    <aside className="rounded-xl bg-white p-5 shadow-card">
      <label htmlFor="catalogue-search" className="font-heading text-sm font-bold text-navy">Search catalogue</label>
      <div className="relative mt-2">
        <Search className="pointer-events-none absolute left-3 top-3 text-steel" size={18} />
        <Input id="catalogue-search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search equipment" className="pl-10" />
      </div>
      <div className="mt-7">
        <p className="font-heading text-sm font-bold text-navy">Categories</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
          <Button variant={selectedCategory === '' ? 'primary' : 'secondary'} onClick={() => onCategoryChange('')} className="min-h-0 px-3 py-2 text-left">All products</Button>
          {categories.map((category) => (
            <Button key={category} variant={selectedCategory === category ? 'primary' : 'secondary'} onClick={() => onCategoryChange(category)} className="min-h-0 px-3 py-2 text-left">{category}</Button>
          ))}
        </div>
      </div>
      {(selectedCategory || search) && <button type="button" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-steel hover:text-navy" onClick={() => { onCategoryChange(''); onSearchChange(''); }}><X size={15} />Clear filters</button>}
    </aside>
  );
}

