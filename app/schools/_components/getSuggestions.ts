"use server";

import { getApiClient } from "../axios";

export async function getSuggestions(query: string) {
    try {
        const api = await getApiClient();
        const res = await api.get(`/books/suggestions?query=${query}`);
        return res.data;
    } catch (ex) {
        console.log(ex);
    }
}