/**
 * Constant-time string comparison.
 *
 * Both values are hashed to SHA-256 first, then compared byte by byte. Hashing
 * matters for two reasons: the digests are always the same length, so the loop
 * cannot leak the secret's length, and the loop runs to completion regardless
 * of where the first difference is.
 *
 * Web Crypto is used rather than `node:crypto` so the same helper works in the
 * proxy (Edge runtime) and in route handlers (Node runtime).
 */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();

  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);

  const bytesA = new Uint8Array(digestA);
  const bytesB = new Uint8Array(digestB);

  let difference = 0;
  for (let i = 0; i < bytesA.length; i += 1) {
    difference |= bytesA[i] ^ bytesB[i];
  }

  return difference === 0;
}
