import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './styles/globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: '100' });

export const metadata: Metadata = {
  title: 'Mark Nalley',
  description: 'Mark Nalley',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
