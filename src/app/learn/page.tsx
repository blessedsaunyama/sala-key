import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LearnPage() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Learn About Modern Cryptography
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the concepts behind modern hashing and encryption algorithms.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Core Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="hashing">
              <AccordionItem value="hashing">
                <AccordionTrigger>Cryptographic Hashing</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">One-Way Function</Badge>
                    <Badge variant="secondary">Fixed-Size Output</Badge>
                    <Badge variant="secondary">Collision Resistant</Badge>
                  </div>
                  <p>
                    A cryptographic hash function is an algorithm that takes an input (or 'message') of any size and returns a fixed-size string of bytes. This output is called the hash, hash value, digest, or simply message digest.
                  </p>
                   <p>
                    The process is <strong className="text-foreground">deterministic</strong>, meaning the same input will always produce the same output. It's designed to be a <strong className="text-foreground">one-way function</strong>, which means it is computationally infeasible to reverse the process and find the original input from its hash.
                  </p>
                  <p>
                    Good hash functions are also designed to be <strong className="text-foreground">collision-resistant</strong>. This means it should be extremely difficult to find two different inputs that produce the exact same hash output. Hash functions are fundamental to data integrity verification, password storage, and blockchain technology.
                  </p>
                  <div className="p-4 bg-muted/50 rounded-md font-code text-sm space-y-4">
                    <div>
                        <p className="font-bold text-foreground">MD5 (Message Digest 5)</p>
                        <p>One of the earliest widely used hash functions. While fast, MD5 is no longer considered secure for cryptographic purposes due to known vulnerabilities that allow for collisions. It's now primarily used for file integrity checks where security is not a concern.</p>
                        <p className="mt-2 break-all">MD5("Hello World"): b10a8db164e0754105b7a99be72e3fe5</p>
                    </div>
                     <div>
                        <p className="font-bold text-foreground">SHA-256 (Secure Hash Algorithm 256-bit)</p>
                        <p>Part of the SHA-2 family, designed by the NSA. It's a widely trusted and used hashing algorithm, offering a good balance of security and performance. It is a standard for many security applications, including SSL certificates and cryptocurrencies like Bitcoin.</p>
                        <p className="mt-2 break-all">SHA-256("Hello World"): a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="symmetric-encryption">
                <AccordionTrigger>Symmetric Encryption (AES)</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Shared Secret Key</Badge>
                        <Badge variant="secondary">Block Cipher</Badge>
                        <Badge variant="secondary">AES</Badge>
                    </div>
                    <p>
                        Symmetric encryption (also known as secret-key encryption) uses a single, shared key to both encrypt and decrypt data. For two parties to communicate securely, they must both have access to the same secret key. This method is very fast and efficient, making it ideal for encrypting large volumes of data.
                    </p>
                    <p>
                       The <strong className="text-foreground">Advanced Encryption Standard (AES)</strong> is the most widely used symmetric algorithm today. It is a block cipher, meaning it operates on fixed-size blocks of data (128 bits). The key size can be 128, 192, or 256 bits, with longer keys providing stronger encryption. AES is considered highly secure and is trusted by governments and corporations worldwide for protecting sensitive information.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-md font-code text-sm">
                        <p className="font-bold text-foreground">Example (AES-256):</p>
                        <p>Plaintext: "My secret message"</p>
                        <p>Key: "a-very-secure-passphrase"</p>
                        <p className="mt-2 break-all">Ciphertext (Base64): U2FsdGVkX1... (output varies due to a random salt)</p>
                        <p className="mt-2">To decrypt this message, you need the exact same key: "a-very-secure-passphrase".</p>
                    </div>
                    <p>
                        The primary challenge with symmetric encryption is <strong className='text-foreground'>key distribution</strong>—how to securely share the secret key between the sender and receiver without it being intercepted.
                    </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
