import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getT } from 'next-i18next/server';

export const Footer: FC = async () => {
  const { t } = await getT('marketing');

  return (
    <footer className="border-t border-border/40 bg-muted/20 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.png"
              width={32}
              height={32}
              alt={t('logo.alt')}
              className="rounded"
            />
            <span className="font-semibold text-lg tracking-tight">Zirodm</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <Link href="#about" className="hover:text-foreground transition-colors">
            {t('nav.about')}
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            {t('nav.pricing')}
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            {t('links.terms')}
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            {t('links.privacy')}
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zirodm. All rights reserved.
        </p>
      </div>
    </footer>
  );
};