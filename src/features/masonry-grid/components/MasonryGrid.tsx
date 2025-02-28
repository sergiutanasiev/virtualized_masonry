import { useMemo, useState, memo, useCallback, useEffect, useRef } from "react";
import { MasonryGridItem } from "./MasonryGridItem";
import { getColumnWidthandGap } from "../../../config/masonryConfig";
import { useMasonryGridLayout } from "../hooks/useMasonryGridLayout";
import { useVisibleGridItems } from "../hooks/useVisibleGridItems";
import { useFetchMasonryItems } from "../../../api/hooks/useFetchMasonryItems";
import { debounce } from "../../../utils/debounce";
import { GridContainer, InnerContainer, LoadingText } from "../../../styled-components/StyledMasonryGrid";

/**
 * Component containing the Virtualized Masonry Grid
 * Responsible for rendering the masonry grid
 */
const MasonryGrid = memo(() => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInitialLoad = useRef(true);
    
    // Custom hook for api request for photos
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useFetchMasonryItems("art");

    // Flatten pages in a single photo array 
    const items = useMemo(() => {
        if (!data) return null;
        return { photos: data.pages.flatMap(page => page.photos) };
    }, [data]);

    const photos = useMemo(() => items?.photos || [], [items?.photos]);

    // Debounce function to handle component update between screen resize
    const debouncedSetWidth = useMemo(() => 
        debounce((width: number) => {
          setContainerWidth(width);
        }, 200
    ), []);
    
    // Callback ref to measure container width
    const setRef = useCallback(
    (node: HTMLDivElement | null) => {
        if (node !== null) {

            const observer = new ResizeObserver((entries) => {
            const newWidth = Math.floor(entries[0].contentRect.width);

            if (isInitialLoad.current) {
                setContainerWidth(newWidth);
                isInitialLoad.current = false;
            } else {
                debouncedSetWidth(newWidth);
            }
            });

            observer.observe(node);
        }
    }, [debouncedSetWidth]);

    // Track scrolling
    useEffect(() => {
    const container = containerRef.current;

        if (!container) {
            return;
        }

        const handleScroll = () => {
            setScrollTop(container.scrollTop);
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - viewportBuffer) {
                if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
                }
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);

    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const { columnWidth, columns, gap, viewportBuffer } = getColumnWidthandGap(containerWidth);

    const { gridArrangedItems, contentHeight } = useMasonryGridLayout(photos, columnWidth, columns, gap);

    const containerHeight = containerRef.current ? containerRef.current.clientHeight : window.innerHeight;

    // Get a collection of the current visible items that should be rendered in the DOM
    const visibleItems = useVisibleGridItems({
        gridArrangedItems,
        scrollTop,
        containerHeight,
        viewportBuffer,
    });

    if (isLoading || !data) return <div>Loading items...</div>;
    if (isError) return <div>Error loading items</div>;

    return (
        <GridContainer ref={containerRef}>
            <InnerContainer ref={setRef} $contentHeight={contentHeight}>
                {visibleItems.map((itemIndex: number) => {
                const photo = photos[itemIndex];
                const pos = gridArrangedItems[itemIndex];
                return (
                    <MasonryGridItem
                    key={photo.id}
                    photo={photo}
                    positions={pos}
                    />
                );
                })}
            </InnerContainer>
            {(isFetchingNextPage) && <LoadingText>Loading more photos...</LoadingText>}
        </GridContainer>
    );
});

export default MasonryGrid;
