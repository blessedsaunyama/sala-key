'use server';

import { z } from 'zod';
import { vigenereCipher } from '@/lib/cipher';

const cipherSchema = z.object({
  text: z.string().min(1, { message: 'Input text cannot be empty.' }),
  key: z.string()
    .min(1, { message: 'Cipher key cannot be empty.' })
    .regex(/^[a-zA-Z]+$/, { message: 'Key must only contain alphabetic characters.' }),
  direction: z.enum(['encrypt', 'decrypt']),
});

export type State = {
  message?: string | null;
  result?: string | null;
  issues?: string[];
};

export async function handleCipher(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = cipherSchema.safeParse({
    text: formData.get('text'),
    key: formData.get('key'),
    direction: formData.get('direction'),
  });

  if (!validatedFields.success) {
    return {
      issues: validatedFields.error.flatten().fieldErrors.key,
      message: validatedFields.error.flatten().fieldErrors.text?.[0],
    };
  }

  const { text, key, direction } = validatedFields.data;

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  const result = vigenereCipher(text, key, direction);

  return { result };
}
