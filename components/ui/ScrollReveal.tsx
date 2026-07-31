'use client';

/**
 * ScrollReveal — Generic scroll-triggered fade + subtle upward slide wrapper.
 *
 * Travel: 10px (restrained — precision implies restraint, not big theatrical movement).
 * Easing: power2.out.
 * Trigger: fires once when the element enters the viewport at 88% from top.
 *
 * Usage:
 *   <ScrollReveal>
 *     <SomeSection />
 *   </ScrollReveal>
 *
 *   With stagger (for a grid of children):
 *   <ScrollReveal stagger>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </ScrollReveal>
 */

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  /** If true, animates each direct child with a stagger offset */
  stagger?: boolean;
  /** Optional delay before animation starts */
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, stagger = false, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];

    let ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          delay,
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
