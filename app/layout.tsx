import type { Metadata } from 'next';
import { Playfair_Display, Caveat, Pacifico } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwritten',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
});

export const metadata: Metadata = {
  title: 'Happy 4th Anniversary, Koyeliya!',
  description: 'A beautiful digital scrapbook.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${caveat.variable} ${pacifico.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
