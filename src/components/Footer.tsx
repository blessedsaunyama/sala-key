import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          Developed by{' '}
          <Link href="https://saunyamabt.dev" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
            Blessed T Saunyama
          </Link>
        </p>
      </div>
    </footer>
  );
}
