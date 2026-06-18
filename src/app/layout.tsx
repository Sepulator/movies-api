import { type Metadata } from 'next';
import '../assets/index.css';
import '../assets/shadcn-classless.css';

export const metadata: Metadata = {
  title: 'Movies API',
  description: 'Movies API Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
