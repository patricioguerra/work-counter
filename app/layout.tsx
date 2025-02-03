import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/ekmas/cs16.css@main/css/cs16.min.css"
        />
      </head>
      <body className="mx-auto grid min-h-screen w-1/2 grid-cols-1 items-center gap-16 p-8 pb-20 sm:p-20">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
