"use server";

import { getApiClient } from "../axios";
import { AddStudent } from "./AddStudentModal";

export async function addStudent(data: AddStudent) {
  try {
    data.parentPhone = `+25${data.parentPhone}`;
    if (data.studentCard === "") delete data.studentCard;
    if (data.email === "") delete data.email;
    const api = await getApiClient();

    const res = await api.post("/students", data);

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
