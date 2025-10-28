import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function LearnPage() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Learn About Ciphers
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the history and mechanics of classical encryption methods.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Classical Ciphers</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="vigenere">
                <AccordionTrigger>Vigenère Cipher</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Polyalphabetic</Badge>
                    <Badge variant="secondary">Keyword-based</Badge>
                  </div>
                  <p>
                    The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. It uses a keyword to shift each letter of the plaintext by a different amount. For example, if the keyword is `SECRET` and the plaintext is `HELLO`, the first letter `H` is shifted by `S` (18 positions), the second `E` is shifted by `E` (4 positions), and so on.
                  </p>
                  <div className="p-4 bg-muted/50 rounded-md font-code text-sm">
                    <p>HELLO + SECRET</p>
                    <p>H (7) + S (18) = Z (25)</p>
                    <p>E (4) + E (4) = I (8)</p>
                    <p>L (11) + C (2) = N (13)</p>
                    <p>L (11) + R (17) = C (2)</p>
                    <p>O (14) + E (4) = S (18)</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold">Result:</span>
                        <span>ZINCS</span>
                    </div>
                  </div>
                  <p>
                    Considered unbreakable for centuries, its weakness is the repeating nature of its keyword, which can be exploited with frequency analysis.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="caesar">
                <AccordionTrigger>Caesar Cipher</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Monoalphabetic</Badge>
                        <Badge variant="secondary">Substitution</Badge>
                    </div>
                    <p>
                        The Caesar cipher is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, `D` would be replaced by `A`, `E` would become `B`, and so on.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-md font-code text-sm flex items-center gap-2">
                        <span>HELLO</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="font-bold">EBIIL</span>
                        <span className="text-muted-foreground">(Shift of -3)</span>
                    </div>
                    <p>
                        The method is named after Julius Caesar, who used it in his private correspondence. Its weakness is that it's trivial to break with frequency analysis, as every letter is always mapped to the same other letter.
                    </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="atbash">
                <AccordionTrigger>Atbash Cipher</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Monoalphabetic</Badge>
                        <Badge variant="secondary">Substitution</Badge>
                    </div>
                    <p>
                        The Atbash cipher is a simple substitution cipher originally used for the Hebrew alphabet. It works by substituting each letter with its reverse in the alphabet; for example, `A` becomes `Z`, `B` becomes `Y`, and so on. It requires no key.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-md font-code text-sm flex items-center gap-2">
                        <span>HELLO</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="font-bold">SVOOL</span>
                    </div>
                    <p>
                        Because it is a fixed, keyless substitution, it offers virtually no security and is easily broken. It is more of a historical curiosity than a practical cipher.
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
