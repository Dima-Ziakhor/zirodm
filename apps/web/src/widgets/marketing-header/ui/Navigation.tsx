import Link from 'next/link';
import { getT } from 'next-i18next/server';

type NavLinkConfig = {
  url: string;
  text: string;
};

export async function Navigation() {
  const { t } = await getT('marketing');
  const navLinks: NavLinkConfig[] = [
    {
      url: '#about',
      text: t('nav.about'),
    },
    {
      url: '#pricing',
      text: t('nav.pricing'),
    },
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-2">
        {navLinks.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="p-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}