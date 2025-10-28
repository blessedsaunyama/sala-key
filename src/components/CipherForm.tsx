'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCipher, type State } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export default function CipherForm() {
  const initialState: State = { message: null, issues: [], result: null };
  const [state, formAction] = useActionState(handleCipher, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: state.message,
      });
    }
    if (state.issues && state.issues.length > 0) {
      toast({
        variant: "destructive",
        title: "Invalid Key",
        description: state.issues.join(' '),
      });
    }
    if(state.result) {
        if(outputRef.current) {
            outputRef.current.value = state.result;
        }
    }
  }, [state, toast]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cipher Engine</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
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

          <div className="space-y-2">
            <Label htmlFor="key">Cipher Key</Label>
            <Input
              id="key"
              name="key"
              placeholder="e.g., SECRET"
              className="font-code"
              required
            />
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
          
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
