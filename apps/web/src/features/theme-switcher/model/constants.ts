import type { Themes } from './types';

export const ThemesProvider = {
  dark: 'light',
  light: 'dark'
}  as Readonly<Record<Themes, Themes>>;