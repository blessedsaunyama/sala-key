'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCipher, type State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type FormType = 'cipher' | 'hash';

export default function CipherForm() {
  const initialState: State = { message: null, issues: {}, result: null };
  const [state, formAction] = useActionState(handleCipher, initialState);
  const { toast } = useToast();
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const [formType, setFormType] = useState<FormType>('cipher');

  useEffect(() => {
    if (state.message || state.issues) {
      const issues = state.issues || {};
      const description = [
        ...(issues.text || []),
        ...(issues.key || []),
        ...(issues._form || []),
      ].join(' ');

      if(description || state.message) {
        toast({
            variant: "destructive",
            title: state.message || "Invalid Input",
            description: description,
        });
      }
    }
    if (state.result) {
      if (outputRef.current) {
        outputRef.current.value = state.result;
      }
    }
  }, [state, toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crypto Engine</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={formType} onValueChange={(value) => setFormType(value as FormType)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cipher">Ciphers</TabsTrigger>
            <TabsTrigger value="hash">Hashes</TabsTrigger>
          </TabsList>
          
          <form action={formAction} className="space-y-6 mt-6">
            <input type="hidden" name="type" value={formType} />
            <TabsContent value="cipher" className="m-0 p-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="cipher-text">Input Text</Label>
                        <Textarea id="cipher-text" name="text" placeholder="Enter the text to process" className="min-h-[150px] font-code" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cipher-output">Output</Label>
                        <Textarea ref={outputRef} id="cipher-output" name="output" placeholder="Result will appear here" className="min-h-[150px] font-code bg-muted/50" readOnly />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cipher-algorithm">Algorithm</Label>
                        <Select name="algorithm" defaultValue="aes">
                            <SelectTrigger id="cipher-algorithm">
                                <SelectValue placeholder="Select a cipher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aes">AES</SelectItem>
                                <SelectItem value="vigenere">Vigenère</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="key">Secret Key</Label>
                        <Input id="key" name="key" placeholder="Your secret passphrase" className="font-code" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Direction</Label>
                    <RadioGroup defaultValue="encrypt" name="direction" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="encrypt" id="encrypt" />
                        <Label htmlFor="encrypt">Encrypt</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="decrypt" id="decrypt" />
                        <Label htmlFor="decrypt">Decrypt</Label>
                        </div>
                    </RadioGroup>
                </div>
                <SubmitButton text="Process Cipher" />
            </TabsContent>

            <TabsContent value="hash" className="m-0 p-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="hash-text">Input Text</Label>
                        <Textarea id="hash-text" name="text" placeholder="Enter the text to hash" className="min-h-[150px] font-code" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hash-output">Output</Label>
                        <Textarea ref={outputRef} id="hash-output" name="output" placeholder="Hash will appear here" className="min-h-[150px] font-code bg-muted/50" readOnly />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="hash-algorithm">Algorithm</Label>
                    <Select name="algorithm" defaultValue="sha256">
                        <SelectTrigger id="hash-algorithm">
                            <SelectValue placeholder="Select a hash algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="md5">MD5</SelectItem>
                            <SelectItem value="sha1">SHA-1</SelectItem>
                            <SelectItem value="sha256">SHA-256</SelectItem>
                            <SelectItem value="sha512">SHA-512</SelectItem>
                            <SelectItem value="sha3">SHA-3</SelectItem>
                            <SelectItem value="ripemd160">RIPEMD-160</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <SubmitButton text="Generate Hash" />
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
