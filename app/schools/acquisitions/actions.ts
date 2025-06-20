"use server";

import { getApiClient } from "../axios";

export const fetchAcquisitions = async () => {
  const api = await getApiClient();
  const response = await api.get(`/acquisitions/schools`);
  return response.data;
};
