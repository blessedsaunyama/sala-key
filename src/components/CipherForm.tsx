'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCipher, type State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Process Text'
      )}
    </Button>
  );
}

type CipherType = 'vigenere' | 'caesar' | 'atbash';

export default function CipherForm() {
  const initialState: State = { message: null, issues: {}, result: null };
  const [state, formAction] = useActionState(handleCipher, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCipher, setSelectedCipher] = useState<CipherType>('vigenere');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.message && (state.issues?.text || state.issues?.key || state.issues?.shift || state.issues?._form)) {
        const description = [
          ...(state.issues.text || []),
          ...(state.issues.key || []),
          ...(state.issues.shift || []),
          ...(state.issues._form || []),
        ].join(' ');
        
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: description || state.message,
        });
    }
    if (state.result) {
      if (outputRef.current) {
        outputRef.current.value = state.result;
      }
    }
  }, [state, toast]);

  const onFormAction = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cipher Engine</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={onFormAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text">Input Text</Label>
              <Textarea
                id="text"
                name="text"
                placeholder="Enter the text to process"
                className="min-h-[150px] font-code"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="output">Output</Label>
              <Textarea
                ref={outputRef}
                id="output"
                name="output"
                placeholder="Result will appear here"
                className="min-h-[150px] font-code bg-muted/50"
                readOnly
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="cipher">Cipher</Label>
                <Select name="cipher" defaultValue="vigenere" onValueChange={(value: CipherType) => setSelectedCipher(value)}>
                    <SelectTrigger id="cipher">
                        <SelectValue placeholder="Select a cipher" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="vigenere">Vigenère Cipher</SelectItem>
                        <SelectItem value="caesar">Caesar Cipher</SelectItem>
                        <SelectItem value="atbash">Atbash Cipher</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="relative min-h-[68px]">
                <AnimatePresence mode="wait">
                    {selectedCipher === 'vigenere' && (
                        <motion.div
                            key="vigenere-key"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 absolute w-full"
                        >
                            <Label htmlFor="key">Cipher Key</Label>
                            <Input id="key" name="key" placeholder="e.g., SECRET" className="font-code" />
                        </motion.div>
                    )}
                    {selectedCipher === 'caesar' && (
                        <motion.div
                            key="caesar-shift"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 absolute w-full"
                        >
                            <Label htmlFor="shift">Shift</Label>
                            <Input id="shift" name="shift" type="number" placeholder="e.g., 3" defaultValue="3" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
          <AnimatePresence>
            {selectedCipher !== 'atbash' && (
                <motion.div
                    key="direction-controls"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 overflow-hidden"
                >
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
                </motion.div>
            )}
          </AnimatePresence>


          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
