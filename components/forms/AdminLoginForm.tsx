'use client';

import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { FieldError, Input } from '@/components/ui/Input';
import { login } from '@/lib/api';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(8, 'Enter your password.').max(128),
});
type LoginValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setSubmitError('');
    try {
      await login(values.email, values.password);
      router.replace('/admin/dashboard');
    } catch (error) {
      setSubmitError(axios.isAxiosError(error) ? error.response?.data?.message || 'Unable to sign in.' : 'Unable to sign in.');
    }
  };

  return <form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-7 shadow-card"><label className="text-sm font-bold text-navy">Email address<Input type="email" autoComplete="email" {...register('email')} /><FieldError message={errors.email?.message} /></label><label className="mt-5 block text-sm font-bold text-navy">Password<Input type="password" autoComplete="current-password" {...register('password')} /><FieldError message={errors.password?.message} /></label>{submitError && <p role="alert" className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-800">{submitError}</p>}<Button type="submit" disabled={isSubmitting} className="mt-6 w-full">{isSubmitting ? 'Signing in…' : 'Sign in'}</Button></form>;
}

