import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { Librarian } from "./_types/librarian";

declare module "next-auth" {
  interface User extends Librarian {
    id: string;
    token?: string;
  }

  interface Session {
    user?: User;
    accessToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
    accessToken: string;
    token?: string;
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
        if (!credentials?.email || !credentials?.password) return null;

        const user = await loginLibrarian(
          credentials.email as string,
          credentials.password as string
        );
        if (!user) return null;

        return {
          id: user.librarianId,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          ...user,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.token!;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: String(token.id),
        email: String(token.email),
        name: String(token.name),
        role: token.role as import("./_types/librarian").Role,
        token: String(token.accessToken),
        // Add required properties with default or token values if available
        emailVerified: null,
        librarianId: (token as any).librarianId ?? String(token.id),
        status: (token as any).status ?? "ACTIVE",
        gender: (token as any).gender ?? "",
        phone: (token as any).phone ?? "",
        address: (token as any).address ?? "",
        firstName: (token as any).firstName ?? "",
        lastName: (token as any).lastName ?? "",
        createdAt: (token as any).createdAt ?? "",
        updatedAt: (token as any).updatedAt ?? "",
      };
      session.accessToken = String(token.accessToken);
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
      { validateStatus: () => true }
    );

    const token = response.headers["x-auth-token"];
    const data = response.data;

    if (response.status !== 200 || !token) {
      console.warn("[loginLibrarian] Login failed:", data);
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
      console.warn("[loginLibrarian] Invalid user:", normalized);
      return null;
    }

    return normalized;
  } catch (error) {
    console.error("[loginLibrarian] Error:", error);
    return null;
  }
}
