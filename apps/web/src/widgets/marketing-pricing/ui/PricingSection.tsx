import { getT } from 'next-i18next/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ui/card';
import { buttonVariants } from '@ui/button';
import { Badge } from '@ui/badge';
import { Check, Gem } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'cn';

interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  description: string[];
  cta: string;
}

export async function PricingSection() {
  const { t } = await getT('marketing');
  const items = t('pricing.items', { returnObjects: true }) as PricingPlan[];

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-muted/20 border-t border-border/40">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="gap-1.5 py-1 lg:py-3 px-3 lg:px-4 tracking-wide">
            <Gem className="size-3.5 md:size-5 text-primary shrink-0" />
            <span>{'Plans'}</span>
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {Array.isArray(items) &&
            items.map((plan, idx) => {
              const isPopular = idx === 1; // Pro is the highlighted tier

              return (
                <Card
                  key={idx}
                  className={`flex flex-col justify-between relative transition-all ${
                    isPopular
                      ? 'border-primary shadow-md bg-card ring-2 ring-primary/20 scale-100 md:-translate-y-4 overflow-visible'
                      : 'border-border/70 bg-card/60'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-0.5 shadow-xs">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div>
                    <CardHeader className="space-y-2 pt-6">
                      <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                      <CardDescription className="min-h-[40px] text-xs">
                        {plan.subtitle}
                      </CardDescription>
                      <div className="pt-2">
                        <span className="text-3xl font-extrabold tracking-tight">
                          {plan.price}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-3">
                      <div className="border-t border-border/50 pt-4 space-y-2.5">
                        {Array.isArray(plan.description) &&
                          plan.description.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm">
                              <Check className="size-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-foreground/85 leading-snug">{feature}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-6 border-t bg-muted/20">
                    <Link
                      href="/sign-up"
                      className={cn(buttonVariants({ variant: isPopular ? 'default' : 'outline' }), 'w-full')}
                    >
                      {plan.cta}
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}
