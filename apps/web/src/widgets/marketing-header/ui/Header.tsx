import type { FC } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Actions } from './Actions';

type Props = {
  isLoggedIn: boolean
};

export const Header: FC<Props> = async ({ isLoggedIn }) => {
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8 py-3">
      <Logo />
      <Navigation />
      <Actions isLoggedIn={isLoggedIn} />
    </header>
  );
};