'use server';

import { z } from 'zod';
import { vigenereCipher, caesarCipher, atbashCipher } from '@/lib/cipher';

const cipherSchema = z.object({
  text: z.string().min(1, { message: 'Input text cannot be empty.' }),
  cipher: z.enum(['vigenere', 'caesar', 'atbash']),
  key: z.string().optional(),
  shift: z.coerce.number().optional(),
  direction: z.enum(['encrypt', 'decrypt']),
}).refine(data => {
  if (data.cipher === 'vigenere') {
    return typeof data.key === 'string' && data.key.length > 0;
  }
  return true;
}, {
    message: 'Vigenère cipher requires a key.',
    path: ['key'],
}).refine(data => {
    if (data.cipher === 'vigenere') {
        return /^[a-zA-Z]+$/.test(data.key ?? '');
    }
    return true;
}, {
    message: 'Key must only contain alphabetic characters.',
    path: ['key'],
}).refine(data => {
    if (data.cipher === 'caesar') {
        return typeof data.shift === 'number';
    }
    return true;
}, {
    message: 'Caesar cipher requires a shift value.',
    path: ['shift'],
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
  const validatedFields = cipherSchema.safeParse({
    text: formData.get('text'),
    cipher: formData.get('cipher'),
    key: formData.get('key'),
    shift: formData.get('shift'),
    direction: formData.get('direction'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      issues: fieldErrors,
      message: "There were errors with your submission. Please check the fields.",
    };
  }

  const { text, cipher, key, shift, direction } = validatedFields.data;

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  let result = '';
  switch (cipher) {
    case 'vigenere':
      result = vigenereCipher(text, key!, direction);
      break;
    case 'caesar':
      result = caesarCipher(text, shift!, direction);
      break;
    case 'atbash':
      result = atbashCipher(text);
      break;
  }

  return { result };
}
