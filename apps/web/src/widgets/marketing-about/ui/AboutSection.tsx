import { getT } from 'next-i18next/server';
import { Card, CardContent } from '@ui/card';
import { Layers, Compass } from 'lucide-react';

export async function AboutSection() {
  const { t } = await getT('marketing');
  const descriptions = t('about.description', { returnObjects: true }) as string[];

  const icons = [Layers, Compass];

  return (
    <section id="about" className="py-20 px-4 md:px-8 border-t border-border/40">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(descriptions) &&
            descriptions.map((desc, index) => {
              const Icon = icons[index] || Layers;
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-xs border-border/60 hover:border-border transition-colors">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}

