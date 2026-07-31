'use client';

/**
 * StatCounter — Animates a number counting up from 0 to target when scrolled into view.
 * Plain JS (IntersectionObserver + requestAnimationFrame). No GSAP dependency.
 */

import { useEffect, useRef, type ReactNode } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
}

export function StatCounter({ value, suffix = '', label, icon }: StatCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    let raf = 0;
    let triggered = false;

    const animate = () => {
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        el.textContent = Math.round(eased * value) + suffix;
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-steel">{icon}</div>
      <p className="mt-4 font-heading text-4xl font-extrabold text-navy md:text-5xl">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest text-gunmetal">{label}</p>
    </div>
  );
}
