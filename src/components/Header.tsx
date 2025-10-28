import Link from 'next/link';
import { Lock, BookOpen, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
          <Button variant="ghost" asChild>
            <Link href="/learn" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Learn
            </Link>
          </Button>
           <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
