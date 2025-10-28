'use server';

import { z } from 'zod';
import { vigenereCipher, caesarCipher, atbashCipher } from '@/lib/cipher';

const cipherSchema = z.object({
  text: z.string().min(1, { message: 'Input text cannot be empty.' }),
  cipher: z.enum(['vigenere', 'caesar', 'atbash']),
  key: z.string().optional(),
  shift: z.coerce.number().optional(),
  direction: z.enum(['encrypt', 'decrypt']).optional().default('encrypt'),
}).superRefine((data, ctx) => {
    switch (data.cipher) {
        case 'vigenere':
            if (typeof data.key !== 'string' || data.key.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Vigenère cipher requires a key.',
                    path: ['key'],
                });
            } else if (!/^[a-zA-Z]+$/.test(data.key)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Key must only contain alphabetic characters.',
                    path: ['key'],
                });
            }
            break;
        case 'caesar':
            if (typeof data.shift !== 'number') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Caesar cipher requires a shift value.',
                    path: ['shift'],
                });
            }
            break;
        case 'atbash':
            // No specific validation needed for atbash
            break;
    }
});

export type State = {
  message?: string | null;
  result?: string | null;
  issues?: Partial<Record<'text' | 'key' | 'shift' | '_form', string[] | undefined>>;
};

export async function handleCipher(
  prevState: State,
  formData: FormData
): Promise<State> {
  const cipher = formData.get('cipher') as 'vigenere' | 'caesar' | 'atbash';

  const dataToValidate: { [key: string]: any } = {
    text: formData.get('text'),
    cipher: cipher,
    direction: formData.get('direction') || 'encrypt',
  };

  if (formData.has('key')) {
    dataToValidate.key = formData.get('key');
  }
  if (formData.has('shift')) {
    dataToValidate.shift = formData.get('shift');
  }
  if (cipher === 'atbash') {
    dataToValidate.direction = 'encrypt';
  }


  const validatedFields = cipherSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      issues: fieldErrors,
      message: "There were errors with your submission. Please check the fields.",
    };
  }

  const { text, cipher: validatedCipher, key, shift, direction } = validatedFields.data;

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  let result = '';
  switch (validatedCipher) {
    case 'vigenere':
      // The superRefine check ensures the key is present and valid
      result = vigenereCipher(text, key!, direction);
      break;
    case 'caesar':
       // The superRefine check ensures the shift is present
      result = caesarCipher(text, shift!, direction);
      break;
    case 'atbash':
      result = atbashCipher(text);
      break;
  }

  return { result };
}
