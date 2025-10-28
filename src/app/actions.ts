'use server';

import { z } from 'zod';
import CryptoJS from 'crypto-js';

// Vigenère cipher implementation
function vigenere(text: string, key: string, decrypt: boolean): string {
    let result = '';
    const keyLength = key.length;
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        // Handle uppercase letters
        if (charCode >= 65 && charCode <= 90) {
            const keyChar = key[(i % keyLength)].toUpperCase().charCodeAt(0);
            const shift = keyChar - 65;
            let newCharCode;
            if (decrypt) {
                newCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
            } else {
                newCharCode = ((charCode - 65 + shift) % 26) + 65;
            }
            result += String.fromCharCode(newCharCode);
        } 
        // Handle lowercase letters
        else if (charCode >= 97 && charCode <= 122) {
            const keyChar = key[(i % keyLength)].toLowerCase().charCodeAt(0);
            const shift = keyChar - 97;
            let newCharCode;
            if (decrypt) {
                newCharCode = ((charCode - 97 - shift + 26) % 26) + 97;
            } else {
                newCharCode = ((charCode - 97 + shift) % 26) + 97;
            }
            result += String.fromCharCode(newCharCode);
        }
        // Non-alphabetic characters remain unchanged
        else {
            result += text.charAt(i);
        }
    }
    return result;
}


const cipherSchema = z.object({
  type: z.literal('cipher'),
  text: z.string().min(1, { message: 'Input text cannot be empty.' }),
  algorithm: z.enum(['aes', 'vigenere']),
  key: z.string().min(1, { message: 'A key is required for encryption.' }),
  direction: z.enum(['encrypt', 'decrypt']),
});

const hashSchema = z.object({
  type: z.literal('hash'),
  text: z.string().min(1, { message: 'Input text cannot be empty.' }),
  algorithm: z.enum(['md5', 'sha1', 'sha256', 'sha512', 'sha3', 'ripemd160']),
});

const combinedSchema = z.union([cipherSchema, hashSchema]);

export type State = {
  message?: string | null;
  result?: string | null;
  issues?: Partial<Record<'text' | 'key' | '_form', string[] | undefined>>;
};

export async function handleCipher(
  prevState: State,
  formData: FormData
): Promise<State> {
  const formType = formData.get('type') as 'cipher' | 'hash';

  const dataToValidate: { [key: string]: any } = {
    type: formType,
    text: formData.get('text'),
    algorithm: formData.get('algorithm'),
  };

  if (formType === 'cipher') {
    dataToValidate.key = formData.get('key');
    dataToValidate.direction = formData.get('direction');
  }

  const validatedFields = combinedSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors as State['issues'];
    return {
      issues: fieldErrors,
      message: "There were errors with your submission. Please check the fields.",
    };
  }

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data } = validatedFields;
  let result = '';

  try {
    if (data.type === 'hash') {
        const { text, algorithm } = data;
        switch (algorithm) {
            case 'md5':
                result = CryptoJS.MD5(text).toString();
                break;
            case 'sha1':
                result = CryptoJS.SHA1(text).toString();
                break;
            case 'sha256':
                result = CryptoJS.SHA256(text).toString();
                break;
            case 'sha512':
                result = CryptoJS.SHA512(text).toString();
                break;
            case 'sha3':
                result = CryptoJS.SHA3(text).toString();
                break;
            case 'ripemd160':
                result = CryptoJS.RIPEMD160(text).toString();
                break;
        }
    } else if (data.type === 'cipher') {
        const { text, algorithm, key, direction } = data;
        if (algorithm === 'aes') {
            if (direction === 'encrypt') {
                result = CryptoJS.AES.encrypt(text, key).toString();
            } else {
                const bytes  = CryptoJS.AES.decrypt(text, key);
                result = bytes.toString(CryptoJS.enc.Utf8);
                if (!result) {
                    return { message: "Decryption failed. Please check your input text and key." };
                }
            }
        } else if (algorithm === 'vigenere') {
            result = vigenere(text, key, direction === 'decrypt');
        }
    }
  } catch (error) {
      console.error(error);
      return { message: "An unexpected error occurred during the cryptographic operation." };
  }


  return { result };
}
