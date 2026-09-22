import '@/_app/global.css';
import { cn } from 'cn';
import type { Metadata } from 'next';
import { I18nProvider } from 'next-i18next/client';
import { initServerI18next, generateI18nStaticParams, getResources, getT } from 'next-i18next/server';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import i18nConfig from '../../i18n.config';

export const metadata: Metadata = {
  icons: {
    icon: '/icon.png'
  }
};

initServerI18next(i18nConfig);

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

type Props = {
  children: ReactNode,
  params: Promise<{ lng: string }>
};

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <html className={cn('font-sans', inter.variable)}>
      <body className="flex flex-col min-h-screen h-[200vh]">
        <I18nProvider language={lng} resources={resources}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}