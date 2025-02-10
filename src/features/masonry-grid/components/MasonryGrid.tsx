import { useEffect, useRef, useState, useMemo, use } from "react";
import { MasonryGridItem } from "@masonry/components/MasonryGridItem";
import { ItemType } from "@masonry/types"
import { useMasonryGridLayout } from "@masonry/components/hooks/useMasonryGridLayout";
import { throttle } from "@utils/throttle";
import { getColumnWidthandGap } from "@/config/masonryConfig";

// Temp mock data
// Generate 100 mocked items with variable height
const mockItems: ItemType[] = Array.from({length: 100},  (_: ItemType, i: number) => {
    return {
        id: i + 1,
        height: 100 + (Math.random() * 400),
        content: `item - ${i + 1}`
    }
});

export const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [columnWidth, setColumnWidth] = useState(0);
    const [gap, setGap] = useState(0);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const observerResize = useMemo(() => (
        
        new ResizeObserver(
            throttle((entries: any) => {
                const currentScreenWidth = Math.floor(entries[0].contentRect.width);
                const {columnWidth, gap} = getColumnWidthandGap(currentScreenWidth)
                setContainerWidth(currentScreenWidth);
                setColumnWidth(columnWidth);
                setGap(gap)
            }, 500)
        )
    ), []);

    useEffect(() => {
        const container = containerRef.current;
        
        if (container) {
            observerResize.observe(container);

            return () => {
                observerResize.unobserve(container);
                observerRef.current?.disconnect();
            }
        }
    }, [observerResize]);

    const {gridArrangedItems, contentHeight} = useMasonryGridLayout(
        mockItems,
        columnWidth,
        gap,
        containerWidth
    );

    return (
        <div 
            ref={containerRef}
            className="masonry-grid-container"
            style={
                {
                    height: '100vh', 
                    position: 'relative', 
                    overflowY: 'auto', 
                    border: '#000 solid 1px'
                }
            }
        >
            <div style={{ height: contentHeight, position: 'relative' }}>
                {gridArrangedItems.map((_, index: number) => (
                    <MasonryGridItem
                        key={index}
                        item={mockItems[index]}
                        width={columnWidth}
                        position={gridArrangedItems[index]}
                    />
                ))}
            </div>
        </div>
    )
}