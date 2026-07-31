'use client';

import { useEffect } from 'react';
import { ButtonLink } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-space bg-offwhite">
      <div className="page-shell max-w-2xl text-center">
        <p className="font-heading text-7xl font-extrabold text-steel">Oops</p>
        <h1 className="mt-4 text-4xl font-extrabold">Something went wrong.</h1>
        <p className="mt-5 leading-7">
          An unexpected error occurred while loading this page. You can try again, or return to the catalogue.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-steel active:scale-[0.97]"
          >
            Try again
          </button>
          <ButtonLink href="/products" variant="secondary">
            View Products
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
