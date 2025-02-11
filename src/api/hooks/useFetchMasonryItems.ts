import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/fetchImages";

export const useFetchMasonryItems = (query: string) => {
    return useQuery({
		queryKey: ['masonryItems', null],
		queryFn: () => fetchImages(query),
		staleTime: 5 * 60 * 1000, // cache for 5 min
    });
};