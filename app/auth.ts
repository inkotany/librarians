import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { Librarian } from "./_types/librarian";

import "next-auth";

// --- NEXTAUTH TYPE EXTENSIONS ---
declare module "next-auth" {
  interface User extends Librarian {
    id: string;
    token?: string;
  }

  interface Session {
    user?: User;
    accessToken?: string;
  }

  interface JWT {
    user?: User;
    accessToken?: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("[auth.ts] API_URL:", API_URL);

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Librarian Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("[authorize] Called with:", credentials);

        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          console.warn("[authorize] Invalid credentials object");
          return null;
        }

        const user = await loginLibrarian({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          console.warn("[authorize] loginLibrarian failed");
          return null;
        }

        return {
          ...user,
          id: user.librarianId, 
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
        console.log("[jwt callback] Set token.user & accessToken");
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user && typeof token.user === "object" && "id" in token.user && "email" in token.user) {
        session.user = token.user as any;
      } else {
        // Provide a fallback or throw an error if user is missing
        throw new Error("[session callback] token.user is missing or invalid");
      }
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
      console.log("[session callback] Set session user & accessToken");
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  jwt: {
    maxAge: 60 * 60 * 24,
  },

  secret: process.env.NEXTAUTH_SECRET,
});

async function loginLibrarian({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<(Librarian & { token: string }) | null> {
  console.log("[loginLibrarian] Called with:", email);

  try {
    const response = await axios.post(
      `${API_URL}/auth/librarians`,
      { email, password },
      {
        validateStatus: () => true,
      }
    );

    const token = response.headers["x-auth-token"];
    const data = response.data;

    if (response.status !== 200 || !token) {
      console.warn("[loginLibrarian] Login failed:", data);
      return null;
    }

    if (!data.librarianId || !data.email || !data.status) {
      console.warn("[loginLibrarian] Incomplete user data:", data);
      return null;
    }

    if (data.status !== "ACTIVE") {
      console.warn(`[loginLibrarian] Account is ${data.status}`);
      return null;
    }

    return {
      ...data,
      token,
    };
  } catch (error) {
    console.error("[loginLibrarian] Error:", error);
    return null;
  }
}
