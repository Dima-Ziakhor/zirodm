'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/shared/components/ui/toggle';
import { ThemesProvider } from '../model/constants';
import { themeGuard } from '../model/guards';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const switchTo = themeGuard(theme) ? ThemesProvider[theme] : ThemesProvider.light;
    setTheme(switchTo);
  };

  return (
    <Toggle
      className="cursor-pointer"
      aria-label="Language switcher"
      onClick={toggleTheme}
    >
      {
        theme === ThemesProvider.dark
          ? <Moon />
          : <Sun />
      }
    </Toggle>
  );
}