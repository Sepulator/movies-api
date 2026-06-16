'use client';

import { Search } from '@/components/search';
import { Flyout } from '@/components/flyout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { search, updateStorage } = useLocalStorage();

  return (
    <main>
      <Header />
      <Search onSearch={updateStorage} placeholder="Search..." initialValue={search} key={search} />
      <hr role="separator" />
      {children}
      <Flyout />
      <Footer />
    </main>
  );
}
