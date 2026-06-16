import type { Metadata } from 'next';
import '../assets/index.css';

export const metadata: Metadata = {
  title: 'Movies API',
  description: 'Movies API Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body id="root">{children}</body>
    </html>
  );
}
