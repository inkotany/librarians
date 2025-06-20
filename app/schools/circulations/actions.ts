"use server";

import { getApiClient } from "../axios";

export async function getCirculations() {
  try {
    const api = await getApiClient();
    const circulations = await api.get("/circulations");
    return circulations.data;
  } catch (ex) {
    console.log(ex);
    return [];
  }
}
