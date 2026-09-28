import Link from 'next/link';
import Image from 'next/image';
import { getT } from 'next-i18next/server';

export async function Logo() {
  const { t } = await getT('marketing');

  return (
    <Link href={'/'}>
      <Image
        src="/icon.png"
        width={50}
        height={50}
        alt={t('logo.alt')}
      />
    </Link>
  );
}