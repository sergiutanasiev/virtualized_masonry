import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/fetchImages";
import { PexelRequestReponse } from "../../features/masonry-grid/types";

/**
 * Custom hook to fetch photos from the Pexels API
 * @param {string} query - Search query for images (ex: art)
 * @returns {Object} Infinite query object with flattened photos array
 */
export const useFetchMasonryItems = (query: string) => {
    const infiniteQuery = useInfiniteQuery<PexelRequestReponse>({
		queryKey: ["masonryItems", query],
		queryFn: async ({ pageParam = 1 }: { pageParam: any }) => fetchImages(query, pageParam),
			initialPageParam: 1,

			getNextPageParam: (lastPage) => {
				const { page, per_page, total_results } = lastPage;
				return page * per_page < total_results ? page + 1 : 1;
			},
		staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

	const photos = infiniteQuery.data
		? infiniteQuery.data.pages.flatMap((page) => page.photos)
		: [];

	return { photos, ...infiniteQuery };
};