"use server";
import { getApiClient } from "../axios";
import { IssueBook } from "./IssueBookModal";

export default async function issueBook(data: IssueBook) {
  try {
    if (data?.comment === "") delete data.comment;
    const api = await getApiClient();
    const res = await api.post("/circulations/lend/student", data);

    return {
      success: true,
      message: res.data,
    };
  } catch (ex) {
    if (typeof ex === "object" && ex !== null && "response" in ex) {
      const errorMsg =
        typeof (ex as any).response.data === "string"
          ? (ex as any).response.data
          : (ex as any).response.data.message || "Something went wrong";

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
