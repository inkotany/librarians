import { auth } from "@/app/auth";
import axios from "axios";
import http from "http";
import https from "https";

export const getApiClient = async () => {
  const session = await auth();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "x-auth-token": session?.accessToken ?? "",
    },
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  });
};
