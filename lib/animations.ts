/**
 * animations.ts — Shared GSAP animation utilities for TriCore Surgical.
 *
 * Theme: "Precision & Clarity" — controlled, measured, surgical.
 * Rules: power2.out / power3.inOut only. No bounce, no elastic, no overshoot.
 * All travel distances intentionally restrained (8–12px max scroll reveals).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once — safe to call multiple times
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Slides the navbar from y:-100% to y:0 on initial load.
 * Should only run once (caller manages with a ref flag).
 */
export function navbarSlideDown(element: HTMLElement) {
  gsap.fromTo(
    element,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
  );
}

/**
 * Fade + subtle upward slide reveal on scroll.
 * Travel is intentionally small (10px) — precision, not theatrics.
 */
export function scrollFadeUp(
  element: Element | Element[] | string,
  options?: { delay?: number; stagger?: number; trigger?: Element },
) {
  gsap.fromTo(
    element,
    { y: 10, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
      scrollTrigger: {
        trigger: options?.trigger ?? (typeof element === 'string' ? element : undefined),
        start: 'top 88%',
        once: true,
      },
    },
  );
}

/**
 * Animates a numeric counter from 0 to a target value when scrolled into view.
 * Used for stat strips — reads as credible, data-driven.
 */
export function countUp(
  element: HTMLElement,
  target: number,
  options?: { duration?: number; suffix?: string },
) {
  const duration = options?.duration ?? 1.4;
  const suffix = options?.suffix ?? '';
  const obj = { value: 0 };

  ScrollTrigger.create({
    trigger: element,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = Math.round(obj.value) + suffix;
        },
      });
    },
  });
}

/**
 * Staggered fade-up for a collection of elements (e.g. product cards in a grid).
 */
export function staggerReveal(elements: Element[], trigger?: Element) {
  gsap.fromTo(
    elements,
    { y: 12, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: trigger ?? elements[0],
        start: 'top 88%',
        once: true,
      },
    },
  );
}

/**
 * Quick page-entry fade: fades the content wrapper in from opacity 0 → 1.
 * 0.25s — fast enough to be invisible as a transition, present enough to avoid a flash.
 */
export function pageFadeIn(element: HTMLElement) {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
}
