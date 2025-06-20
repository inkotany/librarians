"use server";
import { getApiClient } from "../axios";
import { ReturnBook } from "./ReturnBookModal";

export default async function returnBook(data: ReturnBook) {
  try {
    const api = await getApiClient();
    const res = await api.post("/circulations/return/student", data);

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
