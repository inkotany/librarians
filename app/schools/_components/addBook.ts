"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import axios, { AxiosError } from "axios";
import { AddBook } from "./AddBookModal";
import { auth } from "@/app/auth";

type Exception = {
  response?: {
    data?: { message?: string } | string;
  };
  message?: string;
};

export default async function addBook(data: AddBook) {
  try {
    const session = await auth();
    const res = await axios.post(`${API_URL}/books`, data, {
      headers: { "x-auth-token": session?.accessToken },
    });

    return {
      success: true,
      message: res.data,
    };
  } catch (ex: unknown) {
    const error = ex as Exception;
    if (error?.response) {
      const errorMsg =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data?.message || "Something went wrong";

      return {
        success: false,
        message: errorMsg,
      };
    }

    return {
      success: false,
      message: error?.message || "Something failed",
    };
  }
}
