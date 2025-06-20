import { useQuery } from "@tanstack/react-query";
import { getStudents, getStudentsWhoBorrowed, getStudentsWhoLostBooks, getStudentsWhoReturnedBooks } from "./actions";

export const useStudentsQuery = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: getStudents
    });
}

export const useStudentsWhoBorrowedBooksQuery = () => {
    return useQuery({
        queryKey: ['studentsWhoBorrowed'],
        queryFn: getStudentsWhoBorrowed
    });
}

export const useStudentsWhoLostBooksQuery = () => {
    return useQuery({
        queryKey: ['studentsWhoLostBooks'],
        queryFn: getStudentsWhoLostBooks
    });
}

export const useStudentsWhoReturnedBooksQuery = () => {
    return useQuery({
        queryKey: ['studentsWhoReturnedBooks'],
        queryFn: getStudentsWhoReturnedBooks
    });
}