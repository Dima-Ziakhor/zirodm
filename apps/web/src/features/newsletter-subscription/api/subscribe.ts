'use server';

import type { NewsletterSubscription } from '../model/schema';

export async function subscribeToNewsletter(data: NewsletterSubscription) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log(data);
  throw new Error('Server error. Code 500');
  return true;
}