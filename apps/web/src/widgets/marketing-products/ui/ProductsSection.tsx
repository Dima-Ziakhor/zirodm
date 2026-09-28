import { getT } from 'next-i18next/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ui/card';
import { buttonVariants } from '@ui/button';
import { Badge } from '@ui/badge';
import { Check, ShieldCheck, ArrowRight, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'cn';

interface ProductItem {
  title: string;
  subtitle: string;
  description: string[];
  features: string[];
  cta: string;
}

export async function ProductsSection() {
  const { t } = await getT('marketing');
  const items = t('products.items', { returnObjects: true }) as ProductItem[];

  return (
    <section id="products" className="py-20 px-4 md:px-8 border-t border-border/40">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline"  className="gap-1.5 py-1 lg:py-3 px-3 lg:px-4 tracking-wide">
            <FolderGit2 className="size-3.5 md:size-5 text-primary shrink-0" />
            <span>{'Ecosystem'}</span>
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('products.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {Array.isArray(items) &&
            items.map((product, idx) => (
              <Card key={idx} className="border-border/80 shadow-xs relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10" />

                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-base text-primary/80 font-medium">
                        {product.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-2">
                  <div className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                    {Array.isArray(product.description) &&
                      product.description.map((p, i) => <p key={i}>{p}</p>)}
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                      Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {Array.isArray(product.features) &&
                        product.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="size-4 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                              <Check className="size-2.5" />
                            </div>
                            <span className="text-foreground/90">{feat}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t bg-muted/20">
                  <Link
                    href="#pricing"
                    className={cn(buttonVariants(), 'w-full sm:w-auto gap-2')}
                  >
                    <span>{product.cta}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
