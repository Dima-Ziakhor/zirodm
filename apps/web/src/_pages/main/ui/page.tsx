import { Button } from '@/shared/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Link Sentinel'
};

export async function MainPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">This is main page</h1>
      <Button className="cursor-pointer">
        {'Click'}
      </Button>
    </>
  );
}