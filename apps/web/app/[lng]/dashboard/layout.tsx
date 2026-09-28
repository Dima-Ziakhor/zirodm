import type { ReactNode } from 'react';
import { SidebarProvider } from '@/shared/components/ui/sidebar'; 

interface Props {
  children: ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      
    </SidebarProvider>
  );
}