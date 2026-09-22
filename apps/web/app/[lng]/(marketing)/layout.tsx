import '@/_app/global.css';
import { MarketingHeader } from '@/widgets/marketing-header';
import { MarketingFooter } from '@/widgets/marketing-footer';
import type { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader isLoggedIn={false} />

      <main className="flex flex-1">
        {children}
      </main>

      <MarketingFooter />
    </>
  );
}