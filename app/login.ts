import axios from "axios";
import { signIn } from "next-auth/react";

export interface Credentials {
  email: string;
  password: string;
  userType: string;
}

interface LoginResult {
  success: boolean;
  message: unknown;
  data?: unknown;
}

async function checkCredentials(
  credentials: Credentials
): Promise<LoginResult> {
  try {
    let endpoint: string;
    if (credentials.userType === "Librarian") {
      endpoint = "librarians";
    } else if (credentials.userType === "Member") {
      endpoint = "members";
    } else if (credentials.userType === "Institution") {
      endpoint = "director";
    } else {
      endpoint = "admin";
    }
    console.log(endpoint);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`,
      credentials
    );

    return {
      success: true,
      message: response?.data,
    };
  } catch (error) {
    const message =
      error.response?.data || error.message || "Unknown error during pre-check";

    return {
      success: false,
      message: typeof message === "string" ? message : "Pre-check failed",
    };
  }
}

async function login(credentials: Credentials): Promise<LoginResult> {
  const check = await checkCredentials(credentials);

  if (!check.success) {
    return {
      success: false,
      message: check.message,
    };
  }

  try {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.ok && !result.error) {
      const user = check.message as {
        name?: string;
        firstName?: string;
        lastName?: string;
      };
      return {
        success: true,
        message: `Welcome back ${user?.name || user?.firstName || ""} ${user?.lastName || ""}`,
      };
    }

    return {
      success: false,
      message: result?.error || "Authentication failed",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Unexpected error during authentication",
    };
  }
}

export default login;
