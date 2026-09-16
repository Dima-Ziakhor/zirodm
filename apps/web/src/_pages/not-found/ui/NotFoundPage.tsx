import { getT } from 'next-i18next/server';
import { buttonVariants } from '@/shared/components/ui/button';
import Link from 'next/link';

export async function NotFoundPage({ lng }: { lng: string }) {
  const { t } = await getT('common', { lng });

  return (
    <div className="flex-1 flex flex-col items-center justify-center sm:gap-4 md:gap-6 lg:gap-12 p-4 md:max-w-4/5 m-auto">
      <h2 className="text-2xl sm:text-3xl xl:text-4xl text-center font-bold">
        {t('notFoundPage.title')}
      </h2>

      <p className="text-center text-base md:text-lg">
        {t('notFoundPage.description.0')}
        <br />
        <br />
        {t('notFoundPage.description.1')}
      </p>

      <Link
        href={`/${lng}`}
        className={buttonVariants({ size: 'lg' })}
      >
        {t('notFoundPage.backBtnText')}
      </Link>
    </div>
  );
}