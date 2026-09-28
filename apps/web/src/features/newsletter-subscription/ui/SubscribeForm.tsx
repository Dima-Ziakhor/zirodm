'use client';

import { useT } from 'next-i18next/client';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { newsletterSubscriptionSchema, type NewsletterSubscription } from '../model/schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError } from '@/shared/components/ui/field';
import { subscribeToNewsletter } from '../api/subscribe';

export function SubscribeForm() {
  const { t } = useT(['marketing', 'common']);
  const form = useForm<NewsletterSubscription>({
    mode: 'onChange',
    resolver: zodResolver(newsletterSubscriptionSchema),
    defaultValues: {
      email: ''
    },
  });

  const onSubmit = async (data: NewsletterSubscription) => {
    try {
      await subscribeToNewsletter(data);
    } catch (e) {
      form.setError('email', { type: 'deps', message: (e as Error).message }); // TODO
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {form.formState.isSubmitSuccessful ? (
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg p-3">
          <CheckCircle2 className="size-4" />
          <span>{t('hero.form.submit')} ✓</span>
        </div>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="gap-0.5"
                data-invalid={fieldState.invalid}
              >
                <Input
                  {...field}
                  type="email"
                  className="h-10 bg-background"
                  aria-invalid={fieldState.invalid}
                  placeholder={t('hero.form.email.placeholder')}
                  required
                />

                {
                  fieldState.error && (
                    <FieldError
                      className="text-[0.75rem] text-left"
                      errors={[{
                        ...fieldState.error,
                        message: fieldState.error.message ? t(fieldState.error.message) : 'Invalid e-mail'
                      }]}
                    />
                  )
                }
              </Field>
            )}
          />

          <Button
            className="h-10 px-5 shrink-0 cursor-pointer"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin mr-2" />}
            {t('hero.form.submit')}
          </Button>
        </form>
      )}
    </div>
  );
}

