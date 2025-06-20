"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";
import { AddBook } from "./AddBookModal";
import { auth } from "../../../auth";

export default async function addBook(data: AddBook) {
  try {
    const session = await auth();
    const res = await axios.post(`${API_URL}/books`, data, {
      headers: { "x-auth-token": session.accessToken },
    });

    return {
      success: true,
      message: res.data,
    };
  } catch (ex) {
    if (ex.response) {
      const errorMsg =
        typeof ex.response.data === "string"
          ? ex.response.data
          : ex.response.data.message || "Something went wrong";

      return {
        success: false,
        message: errorMsg,
      };
    }

    return {
      success: false,
      message: ex.message || "Something failed",
    };
  }
}
