"use server";

import { getApiClient } from "../axios";
import { RenewCirculation } from "./RenewCirculationModal";

export async function renewCirculation(data: RenewCirculation) {
  try {
    const api = await getApiClient();
    const res = await api.put("/circulations/renew/student", data);

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
