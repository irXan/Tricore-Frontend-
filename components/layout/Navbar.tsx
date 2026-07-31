'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { gsap, navbarSlideDown } from '@/lib/animations';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/brands', label: 'Brands' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Slide-down runs once per session — not on every route change
    let ctx = gsap.context(() => {
      if (headerRef.current && !hasAnimated.current) {
        hasAnimated.current = true;
        navbarSlideDown(headerRef.current);
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <div className="page-shell flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="TriCore Surgical home">
          <span className="block font-heading text-xl font-extrabold tracking-tight text-navy">TRICORE</span>
          <span className="block text-[0.65rem] font-bold tracking-[0.28em] text-steel">SURGICAL</span>
        </Link>

        {/* Desktop nav — hidden below md: breakpoint */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                // Hover underline draws left→right via CSS transition on ::after pseudo-element
                'nav-link font-heading text-sm font-bold transition-colors hover:text-steel',
                pathname === link.href ? 'text-steel' : 'text-navy',
              )}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/quote" className="min-h-0 py-2.5">
            Request a Quote
          </ButtonLink>
        </nav>

        {/* Hamburger — visible below md: breakpoint */}
        <button
          type="button"
          className="rounded-md p-2 text-navy md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 font-heading text-sm font-bold',
                  pathname === link.href ? 'bg-offwhite text-steel' : 'text-navy',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-navy px-3 py-3 text-center font-heading text-sm font-bold text-white"
            >
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
