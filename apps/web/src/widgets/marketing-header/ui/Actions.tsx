import { buttonVariants } from '@ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';
import { getT } from 'next-i18next/server';
import { cn } from 'cn';
import { ThemeSwitcher } from '@/features/theme-switcher/ui/ThemeSwitcher';
import { LangSwitcher } from '@/features/lang-switcher';

type Props = {
  isLoggedIn?: boolean;
};

export async function Actions({ isLoggedIn = false }: Props) {
  const { t } = await getT('marketing');

  return (
    <div className="flex justify-center items-center gap-2">
      <ThemeSwitcher />
      <LangSwitcher />

      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center size-9 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
          aria-label="User profile"
        >
          <User className="size-5" />
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
          >
            {t('nav.login')}
          </Link>

          <Link
            href="/sign-up"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            {t('pricing.items.0.cta')}
          </Link>
        </>
      )}
    </div>
  );
}