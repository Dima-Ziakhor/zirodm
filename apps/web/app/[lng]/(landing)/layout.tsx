import '@/_app/global.css';
import { LandingFooter } from '@/widgets/landing-footer';
import { LandingHeader } from '@/widgets/landing-header';
import type { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LandingHeader isLoggedIn={false} />

      <main className="flex flex-1">
        {children}
      </main>

      <LandingFooter />
    </>
  );
}