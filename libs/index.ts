import { jwtVerify, type JWTPayload } from "jose";

let cachedEncodedKey: Uint8Array | null = null;


export const getJwtSecretKey = (): Uint8Array => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  if (!cachedEncodedKey) {
    cachedEncodedKey = new TextEncoder().encode(secretKey);
  }

  return cachedEncodedKey;
};


export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    console.warn("JWT verification failed:", error);
    return null;
  }
}

