import { createProxy } from 'next-i18next/proxy';
import i18nConfig from './i18n.config';
import type { NextProxy } from 'next/server';

export const i18nProxy = createProxy(i18nConfig);

export const proxy: NextProxy = (request) => {
  return i18nProxy(request);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};