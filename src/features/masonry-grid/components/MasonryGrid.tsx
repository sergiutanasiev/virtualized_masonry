import { useMemo, useState, memo, useCallback } from "react";
import { MasonryGridItem } from "./MasonryGridItem";
import { useFetchMasonryItems } from "../../../api/hooks/useFetchMasonryItems";
import { getColumnWidthandGap } from "../../../config/masonryConfig";
import { useMasonryGridLayout } from "./hooks/useMasonryGridLayout";

const MasonryGrid = memo(() => {
    const { data: items, isLoading, isError } = useFetchMasonryItems(30);
    const [containerWidth, setContainerWidth] = useState(0);

    const photos = useMemo(() => items?.photos || [], [items?.photos]);

    const {columnWidth, columns, gap} = getColumnWidthandGap(containerWidth);

    const {gridArrangedItems} = useMasonryGridLayout(photos, columnWidth, columns, gap);

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
            ref={setRef}
            className="masonry-grid-container"
            style={{
                height: "100vh",
                position: "relative",
            }}
        >
        {photos.map((_, index: number) => {
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
  );
});

export default MasonryGrid;