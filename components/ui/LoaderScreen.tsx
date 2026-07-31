'use client';

/**
 * LoaderScreen — Fail-safe calibration loader for TriCore Surgical.
 *
 * Safety architecture (the bug from Part 1 is structurally impossible here):
 *   1. Hard setTimeout at 1.8s force-hides the loader regardless of animation state.
 *   2. pointer-events: none from the very first frame — never blocks a click.
 *   3. Pure CSS animations — no GSAP, no dynamic imports, no try/catch needed.
 *   4. sessionStorage "shown" flag is set only AFTER the loader has finished hiding.
 *   5. app/error.tsx would catch any thrown error.
 *
 * Visual: navy overlay, CSS stroke-dashoffset traces the "T" mark outline,
 * full-color logo fades in when the trace completes, then the whole overlay fades out.
 */

import { useEffect, useRef, useState } from 'react';
import { TMark } from '@/components/ui/TMark';

const HARD_TIMEOUT_MS = 1800;
const FADE_OUT_MS = 350;
const SESSION_KEY = 'tricore-loader-shown';

export function LoaderScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const hiddenRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    let fadeTimeoutId: ReturnType<typeof setTimeout>;

    const hide = () => {
      if (hiddenRef.current) return;
      hiddenRef.current = true;
      setFadingOut(true);
      fadeTimeoutId = setTimeout(() => {
        setVisible(false);
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // sessionStorage may be unavailable (private mode) — non-critical
        }
      }, FADE_OUT_MS);
    };

    // Hard timeout — the real unmount trigger, independent of any animation.
    const timeoutId = setTimeout(hide, HARD_TIMEOUT_MS);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fadeTimeoutId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy transition-opacity duration-300"
      style={{ pointerEvents: 'none', opacity: fadingOut ? 0 : 1 }}
      aria-hidden="true"
    >
      <div className="blueprint-grid absolute inset-0" />

      <div className="relative flex flex-col items-center">
        <TMark className="h-24 w-24 text-steel" strokeWidth={2.5} />

        {/* SVG overlay for stroke-dashoffset trace — sits exactly over the TMark */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className="absolute top-0 h-24 w-24"
          aria-hidden="true"
        >
          <g
            stroke="#3E7CB1"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="loader-trace"
          >
            <line x1="20" y1="18" x2="80" y2="18" />
            <line x1="20" y1="18" x2="20" y2="28" />
            <line x1="80" y1="18" x2="80" y2="28" />
            <line x1="50" y1="18" x2="50" y2="82" />
            <line x1="38" y1="82" x2="62" y2="82" />
          </g>
        </svg>

        <div className="mt-8 text-center loader-logo-fade">
          <p className="font-heading text-2xl font-extrabold tracking-tight text-white">TRICORE</p>
          <p className="mt-1 font-mono text-[0.65rem] font-bold tracking-[0.28em] text-steel">SURGICAL</p>
        </div>
      </div>
    </div>
  );
}