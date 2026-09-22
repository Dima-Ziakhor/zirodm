import Link from 'next/link';
import { getT } from 'next-i18next/server';

type NavLinkConfig = {
  url: string,
  text: string
};

export async function Navigation() {
  const { t } = await getT('marketing');
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
    <nav className="px-2">
      <ul className="flex justify-between items-center gap-2">
        {
          navLinks.map(item => (
            <li key={item.url}>
              <Link
                href={item.url}
                className="block p-1"
              >
                {item.text}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}