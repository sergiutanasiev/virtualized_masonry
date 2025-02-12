import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/fetchImages";

export const useFetchMasonryItems = (query: string) => {
    const infiniteQuery = useInfiniteQuery({
		queryKey: ["masonryItems", query],
		queryFn: async ({ pageParam = 1 }) => fetchImages(query, pageParam),
			initialPageParam: 1,

			getNextPageParam: (lastPage) => {
				const { page, per_page, total_results } = lastPage;
				return page * per_page < total_results ? page + 1 : undefined;
			},
		staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

	const photos = infiniteQuery.data
		? infiniteQuery.data.pages.flatMap((page) => page.photos)
		: [];

	return { photos, ...infiniteQuery };
};