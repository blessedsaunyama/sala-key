import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CipherSafe | Modern & Classic Cryptography Tool',
  description: 'A modern tool to explore hashing (MD5, SHA-256), modern encryption like AES, and classic ciphers like the Vigenère cipher. Encrypt, decrypt, hash, and learn about cryptography.',
  keywords: ['cryptography', 'encryption', 'decryption', 'hashing', 'AES', 'SHA-256', 'SHA-512', 'MD5', 'Vigenère cipher', 'Atbash cipher', 'Caesar cipher', 'cipher', 'hash', 'security', 'privacy', 'cryptography tool', 'cybersecurity'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen')}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            {children}
            <Footer />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
