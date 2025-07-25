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

// Obfuscated token generation functions for API requests
// These functions implement the backend's required token obfuscation

/**
 * Convert text to Base64 with obfuscation
 * @param password - The input text to encode
 * @returns Obfuscated base64 string
 */
function _0x2a4b(password: string): string {
  const _0x1f3e = password;
  const _0x4c7d = btoa(_0x1f3e);
  return _0x4c7d.split("").reverse().join("").replace(/=/g, "");
}

/**
 * Convert text to Hex with obfuscation
 * @param text - The input text to convert
 * @returns Obfuscated hex string
 */
function _0x8e9a(text: string): string {
  const _0x5b2c = new TextEncoder();
  const _0x7d1f = _0x5b2c.encode(text);
  const _0x3a8e = _0x7d1f.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
  const _0x9c4b = _0x3a8e.split("").reverse();
  return _0x9c4b.join("");
}

/**
 * Apply ROT13 encoding with obfuscation
 * @param str - The input string to encode
 * @returns ROT13 encoded string
 */
function _0x6f5d(str: string): string {
  return str.replace(/[A-Za-z]/g, function (char) {
    const _0x2e7a = char.charCodeAt(0);
    if (_0x2e7a >= 65 && _0x2e7a <= 90) {
      return String.fromCharCode(((_0x2e7a - 65 + 13) % 26) + 65);
    }
    if (_0x2e7a >= 97 && _0x2e7a <= 122) {
      return String.fromCharCode(((_0x2e7a - 97 + 13) % 26) + 97);
    }
    return char;
  });
}

/**
 * Generate obfuscated timestamp token for API requests
 * This implements the backend's required token generation algorithm
 * @returns Obfuscated token string
 */
export function generateTimestampToken(): string {
  let _0x4d8c = Math.floor(Date.now() / 1000) + 60;
  let _0x7b3f = _0x8e9a(_0x4d8c.toString());
  let _0x1e9d = _0x2a4b(_0x7b3f);
  let _0x5a2e = _0x6f5d(_0x1e9d);
  return _0x5a2e;
}
