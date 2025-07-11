import NextAuth from "next-auth";
import { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Librarian } from "./_types/librarian";
import http from "http";
import https from "https";
import "next-auth";
import axios from "axios";
declare module "next-auth" {
  interface User {
    token?: string;
  }
  interface Session {
    user?: User & { token?: string };
  }
}
// Extend the Session type to include accessToken

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum UserType {
  Librarian = "Librarian",
  Member = "Member",
  Institution = "Institution",
  SystemAdmin = "System Admin",
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user: Librarian | null;
        user = await loginLibrarian(
          credentials.email as string,
          credentials.password as string
        );

        if (!user || !user.librarianId || (!user.firstName && !user.lastName)) {
          return null;
        }

        const resultUser = {
          id: user.librarianId,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          ...user,
        };
        return resultUser;
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
      session.user = token.user as typeof session.user;
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : "";
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },

  secret: process.env.NEXTAUTH_SECRET,
});

async function loginLibrarian(
  email: string,
  password: string
): Promise<(Librarian & { token: string; librarianId: string }) | null> {
  try {
    const response = await axios.post(
      `${API_URL}/auth/librarians`,
      { email, password },
      {
        validateStatus: () => true,
        transitional: { clarifyTimeoutError: true },
        httpAgent: new http.Agent({ family: 4 }),
        httpsAgent: new https.Agent({ family: 4 }),
      }
    );

    const token = response.headers["x-auth-token"];
    const data = response.data;

    if (response.status !== 200 || !token) {
      return null;
    }

    const normalized = {
      ...data,
      librarianId: data.id,
      token,
    };

    if (
      !normalized.librarianId ||
      !normalized.email ||
      normalized.status !== "ACTIVE"
    ) {
      return null;
    }

    return normalized;
  } catch (error) {
    return null;
  }
}
