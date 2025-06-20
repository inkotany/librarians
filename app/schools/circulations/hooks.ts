import { useQuery } from "@tanstack/react-query"
import { getCirculations } from "./actions"

export const useCirculationsQuery = () => {
    return useQuery({
        queryKey: ['circulations'],
        queryFn: getCirculations
    });
}