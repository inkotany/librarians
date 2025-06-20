"use server";
import { getApiClient } from "../axios";

export async function getStudents() {
    try {
        const api = await getApiClient();
        const students = await api.get('/students/librarian');
        return students.data;
    } catch (ex) {
        return ex;
    }
}

export async function getStudentsWhoBorrowed() {
    try {
        const api = await getApiClient();
        const students = await api.get('/students/borrowed');
        return students.data;
    } catch (ex) {
        return ex;
    }
}

export async function getStudentsWhoLostBooks() {
    try {
        const api = await getApiClient();
        const students = await api.get('/students/lost');
        return students.data;
    } catch (ex) {
        return ex;
    }
}

export async function getStudentsWhoReturnedBooks() {
    try {
        const api = await getApiClient();
        const students = await api.get('/students/returned');
        return students.data;
    } catch (ex) {
        return ex;
    }
}