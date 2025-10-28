export function vigenereCipher(text: string, key: string, direction: 'encrypt' | 'decrypt'): string {
  if (!key) return text;

  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!keyUpper) return text;

  let result = '';
  let keyIndex = 0;

  for (const char of text) {
    const charUpper = char.toUpperCase();
    
    if (charUpper >= 'A' && charUpper <= 'Z') {
      const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
      const charCode = charUpper.charCodeAt(0);
      
      let newCharCode;
      if (direction === 'encrypt') {
        newCharCode = ((charCode - 65 + shift) % 26) + 65;
      } else { // decrypt
        newCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
      }
      
      result += String.fromCharCode(newCharCode);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}
