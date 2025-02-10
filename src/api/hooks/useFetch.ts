import { useQuery } from "@tanstack/react-query";

export const useFetchMasonryItems = (query: string) => {
    return useQuery({
      queryKey: ['masonryItems', query],
      queryFn: () => fn(query),
      staleTime: 5 * 60 * 1000, // cache for 5 min
    });
};