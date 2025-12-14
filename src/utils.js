// Alphanumeric + Special Characters
export const CHAR_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~";

export const encryptText = (text) => {
  if (!text) return "";
  return text.split('').map((char) => {
    // Preserve layout characters
    if (char === ' ' || char === '\n') return char;
    return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
  }).join('');
};