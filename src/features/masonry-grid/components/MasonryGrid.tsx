import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { MasonryGridItem } from "./MasonryGridItem";
import { ItemType } from "../types";
import { useMasonryGridLayout } from "./hooks/useMasonryGridLayout";

// Temp mock data
// Generate 100 mocked items with variable height
const mockItems: ItemType[] = Array.from({length: 100},  (_: ItemType, i: number) => {
    return {
        id: i + 1,
        height: 100 + (Math.random() * 400),
        content: `item - ${i + 1}`
    }
});

const GAP = 20;
const COLUMN_WIDTH = 300;

export const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const observerResize = useMemo(() => (
        new ResizeObserver((entries) => {
            setContainerWidth(Math.floor(entries[0].contentRect.width));
        })
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
        COLUMN_WIDTH,
        GAP,
        containerWidth
    )

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
                        position={gridArrangedItems[index]}
                    />
                ))}
            </div>
        </div>
    )
}