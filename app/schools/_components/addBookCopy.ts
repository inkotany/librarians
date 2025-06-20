"use server";
import { getApiClient } from "../axios";
import { AddBookCopy } from "./AddBookCopyModal";

export async function addBookCopy(data: AddBookCopy) {
  try {
    const api = await getApiClient();
    const res = await api.post("/bookcopies", data);
    return {
      success: true,
      message: res.data,
    };
  } catch (ex) {
    const errorMsg =
      ex?.response?.data?.message ||
      ex?.response?.data ||
      ex?.message ||
      "Something went wrong";

    return {
      success: false,
      message: errorMsg,
    };
  }
}
