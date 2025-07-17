import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";
import { User } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userCI: number, role: User["role"]) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userCI, role, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  userCI: number;
  role: User["role"];
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & SessionPayload;
  } catch {}
}

// Get the user CI from the session cookie
// Always return a number, even if the session is invalid because the middleware will redirect to the login page if the session is invalid
export async function getUserSession() {
  const session = await decrypt((await cookies()).get("session")?.value);
  return session?.userCI as number;
}
