import { getT } from 'next-i18next/server';
import { Card, CardContent } from '@ui/card';
import { buttonVariants } from '@ui/button';
import { Gift, Zap, Users2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'cn';

interface GetMoreItem {
  title: string;
  description: string;
}

export async function GetMoreSection() {
  const { t } = await getT('marketing');
  const descriptions = t('getMore.description', { returnObjects: true }) as string[];
  const items = t('getMore.items', { returnObjects: true }) as GetMoreItem[];

  const icons = [Gift, Zap, Users2];

  return (
    <section className="py-20 px-4 md:px-8 border-t border-border/40">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('getMore.title')}
          </h2>
          <div className="space-y-2 text-muted-foreground text-base md:text-lg">
            {Array.isArray(descriptions) &&
              descriptions.map((desc, i) => (
                <p key={i} className="leading-relaxed">
                  {desc}
                </p>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const Icon = icons[idx] || Zap;
              return (
                <Card key={idx} className="border-border/60 bg-card/60 hover:bg-card transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        <div className="text-center pt-4">
          <Link
            href="#pricing"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            <span>{t('getMore.cta')}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
