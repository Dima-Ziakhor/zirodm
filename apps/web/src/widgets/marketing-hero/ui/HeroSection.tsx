import { getT } from 'next-i18next/server';
import { SubscribeForm } from '@/features/newsletter-subscription';
import { Badge } from '@ui/badge';
import { Sparkles } from 'lucide-react';

export async function HeroSection() {
  const { t } = await getT('marketing');

  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4 md:px-8 text-center bg-gradient-to-b from-muted/30 via-background to-background">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <Badge variant="secondary" className="gap-1.5 py-1 lg:py-3 px-3 lg:px-4 tracking-wide">
          <Sparkles className="size-3.5 md:size-4 text-primary" />
          <span>{t('hero.title')}</span>
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
          {t('hero.subtitle')}
        </h1>

        <p id="subscribe" className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="w-full mt-4 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-foreground/80">
            {t('hero.form.title')}
          </p>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}

