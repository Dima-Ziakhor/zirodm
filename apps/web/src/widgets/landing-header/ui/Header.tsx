import { User } from 'lucide-react';
import { getT } from 'next-i18next/server';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  isLoggedIn: boolean
};

type NavLinkConfig = {
  url: string,
  text: string
};

export const Header: FC<Props> = async ({ isLoggedIn }) => {
  const { t } = await getT('landing');
  const navLinks: NavLinkConfig[] = [
    {
      url: '/about',
      text: t('nav.about')
    },
    {
      url: '/pricing',
      text: t('nav.pricing')
    },
    {
      url: '/login',
      text: t('nav.login')
    },
  ];

  return (
    <header className="flex justify-center items-center">
      <Link href={'/'}>
        <Image
          src="/icon_dark.png"
          width={100}
          height={100}
          alt={t('logo.alt')}
        />
      </Link>

      <nav>
        <ul className="flex justify-between items-center">
          {
            navLinks.map(item => (
              <li key={item.url}>
                <Link
                  href={item.url}
                >
                  {item.text}
                </Link>
              </li>
            ))
          }

          {
            isLoggedIn && (
              <li>
                <Link href="/dashboard">
                  <User />
                </Link>
              </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
};