import * as z from 'zod/mini';

export const newsletterSubscriptionSchema = z.strictObject({
  email: z.email({ error: 'validation.email.invalid' })
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;

