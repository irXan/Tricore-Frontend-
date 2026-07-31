'use client';

import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { FieldError, Input, Textarea } from '@/components/ui/Input';
import { submitInquiry } from '@/lib/api';

const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  phone: z.string().trim().max(40).optional(),
  itemsText: z.string().trim().min(2, 'Tell us which item or items you need.').max(2000),
  message: z.string().trim().max(3000).optional(),
});

type QuoteValues = z.infer<typeof quoteSchema>;

function errorMessage(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.data?.message || 'We could not send your request. Please try again.' : 'We could not send your request. Please try again.';
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({ resolver: zodResolver(quoteSchema), defaultValues: { name: '', company: '', email: '', phone: '', itemsText: '', message: '' } });

  useEffect(() => {
    const requestedItem = searchParams.get('item');
    if (requestedItem) setValue('itemsText', requestedItem);
  }, [searchParams, setValue]);

  const onSubmit = async (values: QuoteValues) => {
    setSuccess('');
    setSubmitError('');
    try {
      const result = await submitInquiry({
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        items: values.itemsText.split(/\n|,/).map((item) => item.trim()).filter(Boolean),
        message: values.message,
      });
      setSuccess(result.message);
      reset();
    } catch (error) {
      setSubmitError(errorMessage(error));
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
      <label className="mt-5 block text-sm font-bold text-navy">Item(s) needed<Textarea rows={4} placeholder="List equipment, model numbers, quantities, or requirements." {...register('itemsText')} /><FieldError message={errors.itemsText?.message} /></label>
      <label className="mt-5 block text-sm font-bold text-navy">Additional message <span className="font-normal text-gunmetal">(optional)</span><Textarea rows={5} placeholder="Tell us about your facility, delivery timing, or other requirements." {...register('message')} /><FieldError message={errors.message?.message} /></label>
      {success && <p role="status" className="mt-5 flex items-center gap-2 rounded-md bg-green-50 p-4 text-sm text-green-800"><CheckCircle2 size={18} />{success}</p>}
      {submitError && <p role="alert" className="mt-5 rounded-md bg-red-50 p-4 text-sm text-red-800">{submitError}</p>}
      <Button type="submit" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">{isSubmitting ? 'Sending request…' : <><Send size={17} className="mr-2" />Send quote request</>}</Button>
    </form>
  );
}

