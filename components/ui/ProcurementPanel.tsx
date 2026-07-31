'use client';

/**
 * ProcurementPanel — Client island for the hero "Built for procurement teams" panel.
 *
 * Each bullet's left-border-line draws in from top to bottom as it scrolls into view,
 * using GSAP ScrollTrigger with gsap.context() + cleanup on unmount.
 */

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const bullets = [
  'Product guidance aligned to the needs of hospitals, clinics, and healthcare facilities.',
  'Recognised medical brands alongside responsive, item-specific quoting.',
  'A straightforward route from requirement to supply discussion.',
];

export function ProcurementPanel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx = gsap.context(() => {
      const items = container.querySelectorAll('[data-bullet-line]');
      if (!items.length) return;

      gsap.fromTo(
        items,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        },
      );

      const texts = container.querySelectorAll('[data-bullet-text]');
      gsap.fromTo(
        texts,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm lg:block"
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-steel">Built for procurement teams</p>
      <ul className="mt-6 grid gap-5 text-sm leading-6 text-slate-100">
        {bullets.map((text) => (
          <li key={text} className="relative pl-4">
            <span
              data-bullet-line
              className="absolute left-0 top-0 h-full w-0.5 bg-steel"
            />
            <span data-bullet-text>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
