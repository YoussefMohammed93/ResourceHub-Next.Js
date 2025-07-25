import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Password encryption utilities based on swagger documentation
// ROT13 + Base64 + Hex encoding
export function encryptPassword(password: string): string {
  // Step 1: ROT13 encoding
  const rot13 = password.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - start + 13) % 26) + start
    );
  });

  // Step 2: Base64 encoding
  const base64 = btoa(rot13);

  // Step 3: Hex encoding
  const hex = Array.from(base64)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

  return hex;
}

// Generate timestamp token for API requests
export function generateTimestampToken(): string {
  return Math.floor(Date.now() / 1000).toString();
}
