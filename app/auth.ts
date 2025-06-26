import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { Librarian } from "./_types/librarian";

import "next-auth";

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
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user && typeof token.user === "object" && "id" in token.user && "email" in token.user) {
        session.user = token.user as any;
      } else {
        throw new Error("[session callback] token.user is missing or invalid");
      }
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
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

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      }
    }
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
