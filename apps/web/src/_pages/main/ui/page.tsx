import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { HeroSection } from '@/widgets/marketing-hero';
import { AboutSection } from '@/widgets/marketing-about';
import { MissionSection } from '@/widgets/marketing-mission';
import { ProductsSection } from '@/widgets/marketing-products';
import { PricingSection } from '@/widgets/marketing-pricing';
import { GetMoreSection } from '@/widgets/marketing-get-more';
import { FinalSection } from '@/widgets/marketing-final';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT('marketing');

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export async function MainPage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ProductsSection />
      <PricingSection />
      <GetMoreSection />
      <FinalSection />
    </div>
  );
}