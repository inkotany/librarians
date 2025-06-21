import axios from "axios";
import { signIn } from "next-auth/react"; // ✅ Use from 'next-auth/react'

export interface Credentials {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  message: string;
  data?: unknown;
}

async function checkCredentials(credentials: Credentials): Promise<LoginResult> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/librarians`,
      credentials,
      { validateStatus: () => true }
    );

    if (response.status !== 200) {
      return {
        success: false,
        message: typeof response.data === "string" ? response.data : "Invalid credentials",
      };
    }

    return {
      success: true,
      message: "Credentials verified",
      data: response.data,
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Error validating credentials";

    return {
      success: false,
      message: typeof message === "string" ? message : "Unknown error",
    };
  }
}

export async function login(credentials: Credentials): Promise<LoginResult> {
  const check = await checkCredentials(credentials);

  if (!check.success) {
    return check;
  }

  try {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false, // ✅ Prevent redirect for manual handling
    });

    if (result?.ok && !result.error) {
      const user = check.data as {
        name?: string;
        firstName?: string;
        lastName?: string;
      };

      const name =
        user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

      return {
        success: true,
        message: `Welcome back${name ? `, ${name}` : ""}`,
        data: user,
      };
    }

    return {
      success: false,
      message: result?.error || "Authentication failed",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message || "Unexpected error during login"
        : "Unexpected error during login",
    };
  }
}

export default login;
