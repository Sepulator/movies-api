import type { Metadata } from 'next';

import '../assets/index.css';
import '../assets/shadcn-classless.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Movies API',
  description: 'Movies API Application',
};

export default function RootLayout({ children, details }: { children: React.ReactNode; details: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="root">
        <Providers>
          {children}
          {details}
        </Providers>
      </body>
    </html>
  );
}
