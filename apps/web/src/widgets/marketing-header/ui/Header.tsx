import type { FC } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Actions } from './Actions';

type Props = {
  isLoggedIn: boolean
};

export const Header: FC<Props> = async ({ isLoggedIn }) => {
  return (
    <header className="flex justify-between items-center sticky top-0">
      <Logo />
      <Navigation />
      <Actions />
    </header>
  );
};