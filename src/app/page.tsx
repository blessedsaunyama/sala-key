import CipherForm from '@/components/CipherForm';

export default function Home() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
            SalaKey
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern tool to explore hashing, modern encryption like AES, and classic ciphers. All operations are securely processed on the server.
          </p>
        </div>
        <CipherForm />
      </div>
    </main>
  );
}
