'use client';

/**
 * HeroHeadline — Client island for the homepage hero section.
 *
 * Implements the "scan-line wipe" reveal:
 *   1. A thin steel-blue line (1px) sweeps left → right across the headline.
 *   2. As the line passes, the headline text is revealed via clipPath.
 *   3. Line fades out once the sweep is complete.
 *   4. Eyebrow and subtext follow with a clean, fast fade.
 *
 * This is the signature animation moment — not repeated elsewhere.
 * easing: power3.inOut throughout (precise, not playful).
 */

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

interface HeroHeadlineProps {
  eyebrow: string;
  headline: string;
  subtext?: string;
}

export function HeroHeadline({ eyebrow, headline, subtext }: HeroHeadlineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const line = lineRef.current;
    const eyebrowEl = eyebrowRef.current;
    const headlineEl = headlineRef.current;
    const subtextEl = subtextRef.current;

    if (!wrapper || !line || !eyebrowEl || !headlineEl) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      // Start: headline hidden, line ready at left edge
      gsap.set(headlineEl, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(eyebrowEl, { opacity: 0 });
      if (subtextEl) gsap.set(subtextEl, { opacity: 0 });
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center', opacity: 1 });

      tl
        // 1. Eyebrow fades in quietly (not the star)
        .to(eyebrowEl, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)
        // 2. Scan line draws from left to right
        .to(line, { scaleX: 1, duration: 0.75, ease: 'power3.inOut' }, 0.2)
        // 3. Headline reveals as the line passes — clip opens left to right
        .to(headlineEl, { clipPath: 'inset(0 0% 0 0)', duration: 0.75, ease: 'power3.inOut' }, 0.2)
        // 4. Line fades out once across
        .to(line, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0.9)
        // 5. Subtext follows with a simple fast fade
        .to(subtextEl ?? {}, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.95);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <p ref={eyebrowRef} className="eyebrow text-steel">
        {eyebrow}
      </p>

      {/* Scan-line — positioned over the headline, sweeps left→right */}
      <div className="relative mt-0">
        <div
          ref={lineRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 z-10 h-[2px] w-full -translate-y-1/2 bg-steel opacity-0"
          style={{ transformOrigin: 'left center' }}
        />
        <h1
          ref={headlineRef}
          className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          {headline}
        </h1>
      </div>

      {subtext && (
        <p
          ref={subtextRef}
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-200"
          style={{ opacity: 0 }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
