import Link from 'next/link';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground">
          <div className="bg-primary text-primary-foreground p-2 rounded-md">
            <Lock className="w-5 h-5" />
          </div>
          <span className="hidden sm:inline font-headline">CipherSafe</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Cipher
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/analysis" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Analysis
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
