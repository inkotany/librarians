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
    if (ex.response) {
      const errorMsg =
        typeof ex.response.data === "string"
          ? ex.response.data
          : ex.response.data.message || "Something went wrong";

      return {
        success: false,
        message: errorMsg,
      };
    }

    return {
      success: false,
      message: ex.message || "Something failed",
    };
  }
}
