import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'bg-navy text-white hover:bg-steel',
  secondary: 'border border-navy bg-transparent text-navy hover:border-steel hover:text-steel',
  light: 'bg-white text-navy hover:bg-offwhite',
  'outline-light': 'border border-white bg-transparent text-white hover:bg-white hover:text-navy',
};

const base = 'inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 font-heading text-sm font-bold transition-[colors,transform] duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}

