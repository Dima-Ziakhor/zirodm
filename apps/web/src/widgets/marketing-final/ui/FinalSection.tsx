import { getT } from 'next-i18next/server';
import { buttonVariants } from '@ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'cn';

export async function FinalSection() {
  const { t } = await getT('marketing');

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 border-t border-border/40 bg-gradient-to-b from-background via-muted/20 to-muted/40 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          {t('final.title')}
        </h2>

        <p className="text-lg md:text-xl text-primary font-medium max-w-2xl">
          {t('final.subtitle')}
        </p>

        <p className="text-muted-foreground text-base max-w-xl">
          {t('final.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
          <Link
            href="#pricing"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            <span>{t('final.cta.products')}</span>
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href={{ hash: 'subscribe' }}
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'gap-2')}
          >
            <Mail className="size-4" />
            <span>{t('final.cta.updates')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
