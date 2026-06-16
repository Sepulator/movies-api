import type { Metadata } from 'next';

import '../assets/index.css';
import '../assets/shadcn-classless.css';
import Providers from './providers';
import { MainLayout } from './main-layout';

export const metadata: Metadata = {
  title: 'Movies API',
  description: 'Movies API Application',
};

export default function RootLayout({ children, details }: { children: React.ReactNode; details: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="root">
        <Providers>
          <MainLayout>
            <section className="split-view">
              {children}
              {details}
            </section>
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
