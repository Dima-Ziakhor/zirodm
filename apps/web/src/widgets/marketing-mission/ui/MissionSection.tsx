import { getT } from 'next-i18next/server';
import { Card, CardContent } from '@ui/card';
import { Check, Target } from 'lucide-react';

export async function MissionSection() {
  const { t } = await getT('marketing');

  const descriptions = t('mission.description', { returnObjects: true }) as string[];
  const bullets = t('mission.goal.bullets', { returnObjects: true }) as string[];

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/20 border-t border-border/40">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('mission.title')}
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

        <Card className="border-border/60 bg-card/80 backdrop-blur-xs">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Target className="size-5" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">
                {t('mission.goal.title')}
              </h3>
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              {t('mission.goal.description')}
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {Array.isArray(bullets) &&
                bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check className="size-3" />
                    </div>
                    <span className="text-sm text-foreground/90 leading-normal">
                      {bullet}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto italic">
          {t('mission.current')}
        </p>
      </div>
    </section>
  );
}

