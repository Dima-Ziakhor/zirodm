'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/shared/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useT } from 'next-i18next/client';
import type { Locale } from '../model/types';
import { localesMap } from '../model/constants';

export function LangSwitcher() {
  const { i18n } = useT();
  const currentLang = i18n.language || 'en';
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (locale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button
          className="cursor-pointer"
          aria-label="Switch language"
          variant="ghost"
        >
          <Languages size="lg" />
        </Button>
      } />

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={currentLang}
          onValueChange={switchLang}
        >
          {
            Object.entries(localesMap).map(([key, name]) => (
              <DropdownMenuRadioItem
                key={key}
                value={key}
                className="cursor-pointer"
              >
                {name}
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}