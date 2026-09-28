import type { Themes } from './types';
import { ThemesProvider } from './constants';

export function themeGuard(theme: unknown): theme is Themes {
  return typeof theme === 'string' && theme in ThemesProvider;
}
