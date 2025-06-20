"use server";

import { getApiClient } from "../axios";

export const fetchBooks = async () => {
  const api = await getApiClient();
  const response = await api.get(`/books/schools`);
  return response.data;
};
