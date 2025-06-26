"use server";

import { getApiClient } from "../axios";
import { AddAquistion } from "./AquireBookModal";

export async function acquireBooks(data: AddAquistion) {
  try {
    const api = await getApiClient();
    const res = await api.post("/acquisitions", data);

    return {
      success: true,
      message: res.data,
    };
  } catch (ex) {
    const err = ex as { response?: { data?: { message?: string } | string }, message?: string };
    const errorMsg =
      err?.response?.data && typeof err.response.data === "object" && "message" in err.response.data
        ? (err.response.data as any).message
        : err?.response?.data ||
          err?.message ||
          "Something went wrong";

    return {
      success: false,
      message: errorMsg,
    };
  }
}
