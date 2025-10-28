# CipherSafe: A Modern Cryptography Tool

CipherSafe is a web application built with Next.js that provides a user-friendly interface for exploring modern cryptographic algorithms. Users can encrypt, decrypt, and hash text using various standard methods, and learn about the underlying principles of cryptography.

## Features

- **Dual-Functionality:** Easily switch between encryption/decryption (Ciphers) and hashing with a simple tabbed interface.
- **AES Encryption:** Securely encrypt and decrypt messages using the Advanced Encryption Standard (AES), the industry standard for symmetric encryption.
- **Modern Hashing Algorithms:** Generate hashes using a comprehensive set of algorithms:
  - MD5
  - SHA-1
  - SHA-256 (Recommended)
  - SHA-512
  - SHA-3
  - RIPEMD-160
- **Educational Content:** A dedicated "Learn" page explains the core concepts of cryptographic hashing and symmetric encryption with clear examples.
- **Secure Server-Side Operations:** All cryptographic operations are handled securely on the server using Next.js Server Actions.
- **Light & Dark Mode:** A theme toggle allows users to switch between light and dark modes for comfortable viewing.
- **Responsive Design:** The application is fully responsive and works beautifully on desktops, tablets, and mobile devices.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Cryptography:** [CryptoJS](https://github.com/brix/crypto-js)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To run this project locally, you'll need Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
