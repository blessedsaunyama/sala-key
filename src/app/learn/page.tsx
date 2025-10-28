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
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="hashing">
                <AccordionTrigger>Cryptographic Hashing</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">One-Way Function</Badge>
                    <Badge variant="secondary">Fixed-Size Output</Badge>
                    <Badge variant="secondary">Collision Resistant</Badge>
                  </div>
                  <p>
                    A cryptographic hash function is a one-way function that takes an input of any size and produces a fixed-size string of bytes, called a hash. The process is deterministic, meaning the same input will always produce the same output. It's computationally infeasible to reverse the process (i.e., find the input from the hash).
                  </p>
                  <p>
                    Good hash functions are also designed to be <strong className="text-foreground">collision-resistant</strong>, meaning it's extremely difficult to find two different inputs that produce the same hash. Hash functions are fundamental to data integrity, password storage, and blockchains.
                  </p>
                  <div className="p-4 bg-muted/50 rounded-md font-code text-sm">
                    <p className="font-bold text-foreground">Example (SHA-256):</p>
                    <p>Input: "Hello World"</p>
                    <p className="mt-2 break-all">Output: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e</p>
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
                        Symmetric encryption uses a single, shared secret key to both encrypt and decrypt data. Both the sender and the receiver must have access to the same key. It is very fast and efficient for encrypting large amounts of data.
                    </p>
                    <p>
                       The <strong className="text-foreground">Advanced Encryption Standard (AES)</strong> is the most widely used symmetric algorithm today. It is a block cipher, meaning it operates on fixed-size blocks of data (128 bits for AES). It is considered highly secure and is used by governments and corporations worldwide.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-md font-code text-sm">
                        <p className="font-bold text-foreground">Example (AES):</p>
                        <p>Plaintext: "Message"</p>
                        <p>Key: "Secret Passphrase"</p>
                        <p className="mt-2 break-all">Ciphertext (Base64): U2FsdGVkX1... (output varies due to salt)</p>
                        <p className="mt-2">To decrypt, you need the exact same key: "Secret Passphrase".</p>
                    </div>
                    <p>
                        The main challenge with symmetric encryption is securely sharing the secret key between parties.
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
