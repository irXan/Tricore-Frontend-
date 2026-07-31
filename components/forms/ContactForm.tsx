'use client';

import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { FieldError, Input, Textarea } from '@/components/ui/Input';
import { submitInquiry } from '@/lib/api';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(5, 'Please add a short message.').max(3000),
});
type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string }>();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    setStatus(undefined);
    try {
      const result = await submitInquiry({ ...values, items: ['General contact request'] });
      setStatus({ type: 'success', message: result.message });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: axios.isAxiosError(error) ? error.response?.data?.message || 'We could not send your message.' : 'We could not send your message.',
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-navy">Name<Input autoComplete="name" {...register('name')} /><FieldError message={errors.name?.message} /></label>
        <label className="text-sm font-bold text-navy">Company<Input autoComplete="organization" {...register('company')} /><FieldError message={errors.company?.message} /></label>
        <label className="text-sm font-bold text-navy">Business email<Input type="email" autoComplete="email" {...register('email')} /><FieldError message={errors.email?.message} /></label>
        <label className="text-sm font-bold text-navy">Phone<Input type="tel" autoComplete="tel" {...register('phone')} /><FieldError message={errors.phone?.message} /></label>
      </div>
      <label className="mt-5 block text-sm font-bold text-navy">Message<Textarea rows={6} {...register('message')} /><FieldError message={errors.message?.message} /></label>
      {status && <p role={status.type === 'error' ? 'alert' : 'status'} className={`mt-5 flex items-center gap-2 rounded-md p-4 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{status.type === 'success' && <CheckCircle2 size={18} />}{status.message}</p>}
      <Button type="submit" disabled={isSubmitting} className="mt-6">{isSubmitting ? 'Sending message…' : <><Send size={17} className="mr-2" />Send message</>}</Button>
    </form>
  );
}

