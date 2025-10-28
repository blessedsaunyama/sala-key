# **App Name**: CipherSafe

## Core Features:

- Server-Side Encryption: Encrypt the input using the Vigenère cipher logic executed on the server. Only the text and key are sent from the client.
- Server-Side Decryption: Decrypt the ciphertext using the Vigenère cipher logic executed on the server.
- Input Validation: Validate user input (plaintext and key) on the server using Zod/TypeScript to ensure it meets the required format (e.g., A-Z characters only, length constraints).
- Security Headers: Configure security headers in next.config.js to protect against XSS and clickjacking attacks.
- Optimistic UI: Provide an immediate 'Encrypting...' or 'Decrypting...' loading state while the server processes the request, creating a smoother user experience.
- Frequency Analysis Tool: Implement a frequency analysis tool to demonstrate the weaknesses of the Vigenère cipher.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082) to convey security and sophistication.
- Background color: Light gray (#F0F0F0), offering a neutral and clean backdrop to focus attention on the app's functionality.
- Accent color: Teal (#008080) to draw attention to CTAs and highlights; for example, a button showing frequency analysis.
- Body and headline font: 'Inter' sans-serif font for a modern and clean aesthetic, suitable for both headlines and body text.
- Code font: 'Source Code Pro' monospace font to clearly present ciphertext and analysis results.
- Use a clear and structured layout to separate the input form, cipher logic results, and frequency analysis tool.
- Subtle loading animations while encryption/decryption is in progress to maintain user engagement.