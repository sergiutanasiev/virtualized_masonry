import { useMemo, useState, useCallback, useRef } from "react";
import { MasonryGridItem } from "./MasonryGridItem";
import { useFetchMasonryItems } from "../../../api/hooks/useFetchMasonryItems";
import { getColumnWidthandGap } from "../../../config/masonryConfig";
import { useMasonryGridLayout } from "./hooks/useMasonryGridLayout";
import { useVisibleGridItems } from "./hooks/useVisibleGridItems";
import { useThrottledScroll } from "../../../hooks/useThrottleScroll";

const MasonryGrid = () => {
    const { data: items, isLoading, isError } = useFetchMasonryItems("80");
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const scrollTop = useThrottledScroll();

    const photos = useMemo(() => items?.photos || [], [items?.photos]);

    const {columnWidth, columns, gap, viewportBuffer} = getColumnWidthandGap(containerWidth);

    const {gridArrangedItems, contentHeight} = useMasonryGridLayout(photos, columnWidth, columns, gap);

    const viewportHeight = window.innerHeight;

    const visibleItems = useVisibleGridItems({
        gridArrangedItems,
        scrollTop,
        containerHeight: viewportHeight,
        viewportBuffer,
    });

    const setRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            const observer = new ResizeObserver((entries) => {
                setContainerWidth(Math.floor(entries[0].contentRect.width));
            });
            observer.observe(node);
        }
    }, []);

    if (isLoading || !items) return <div>Loading items...</div>;
    if (isError) return <div>Error loading items</div>;

    return (
        <div
            ref={containerRef}
            className="masonry-grid-container"
            style={{
                position: "relative",
                border: "red solid 1px"
            }}
        >
            
            <div ref={setRef} style={{ height: `${contentHeight}px`}}>
            {visibleItems.map((index: number) => {
                const photo = photos[index];
                const positions = gridArrangedItems[index];

                return (
                    <MasonryGridItem
                        key={index}
                        id={photo.id}
                        src={photo.src.tiny}
                        alt={photo.alt}
                        set={[photo.src]}
                        positions={positions}
                        columnWidth={columnWidth}
                    />
                )
                })}
            </div>
        </div>
    );
};

export default MasonryGrid;