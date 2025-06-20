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
