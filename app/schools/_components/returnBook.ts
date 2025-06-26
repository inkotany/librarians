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
    if (typeof ex === "object" && ex !== null && "response" in ex) {
      const err = ex as { response: { data: any } };
      const errorMsg =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.data.message || "Something went wrong";

      return {
        success: false,
        message: errorMsg,
      };
    }

    return {
      success: false,
      message: typeof ex === "object" && ex !== null && "message" in ex
        ? (ex as { message?: string }).message || "Something failed"
        : "Something failed",
    };
  }
}
