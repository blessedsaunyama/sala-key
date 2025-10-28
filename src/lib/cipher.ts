export function vigenereCipher(text: string, key: string, direction: 'encrypt' | 'decrypt'): string {
  if (!key) return text;

  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!keyUpper) return text;

  let result = '';
  let keyIndex = 0;

  for (const char of text) {
    const charCode = char.charCodeAt(0);

    if (char >= 'A' && char <= 'Z') {
      const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
      keyIndex++;
      let newCharCode;
      if (direction === 'encrypt') {
        newCharCode = ((charCode - 65 + shift) % 26) + 65;
      } else {
        newCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
      }
      result += String.fromCharCode(newCharCode);
    } else if (char >= 'a' && char <= 'z') {
        const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        keyIndex++;
        let newCharCode;
        if (direction === 'encrypt') {
            newCharCode = ((charCode - 97 + shift) % 26) + 97;
        } else {
            newCharCode = ((charCode - 97 - shift + 26) % 26) + 97;
        }
        result += String.fromCharCode(newCharCode);
    }
    else {
      result += char;
    }
  }

  return result;
}

export function caesarCipher(text: string, shift: number, direction: 'encrypt' | 'decrypt'): string {
    shift = direction === 'encrypt' ? shift : -shift;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = text.charCodeAt(i);

        if (char >= 'A' && char <= 'Z') {
            char = String.fromCharCode(((charCode - 65 + shift % 26 + 26) % 26) + 65);
        }
        else if (char >= 'a' && char <= 'z') {
            char = String.fromCharCode(((charCode - 97 + shift % 26 + 26) % 26) + 97);
        }
        result += char;
    }
    return result;
}

export function atbashCipher(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = text.charCodeAt(i);

        if (char >= 'A' && char <= 'Z') {
            char = String.fromCharCode(90 - (charCode - 65));
        }
        else if (char >= 'a' && char <= 'z') {
            char = String.fromCharCode(122 - (charCode - 97));
        }
        result += char;
    }
    return result;
}
