import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { MasonryGridItem } from "./MasonryGridItem";
import { ItemType, ItemPositions } from "../types";

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
const BUFFER = 500;

export const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridArrangedItems, setGridArrangedItems] = useState<ItemPositions[]>([]);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        generateMasonryGridLayout();
    }, []);

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

    const generateMasonryGridLayout = () => {
        if (!containerRef.current) {
            return;
        }

        // Min number of columns is 2(for mobile)
        const numColumns = Math.max(2, Math.floor((containerRef.current.offsetWidth + GAP) / (COLUMN_WIDTH + GAP)));
        const gridColumns = Array(numColumns).fill(0); 
    
        const gridArrangedItems: ItemPositions[] = [];

        // itterate items and add next item to the smallest array in height. 
        // height is represented by a the sum of all items heights added to that column
        mockItems.forEach((item) => {
            // identify smallest column
            const smallestColumnIndex = gridColumns.indexOf(Math.min(...gridColumns));

            //x pos ex for col2: 1 * (300 + 20); x is 320px
            const x = smallestColumnIndex * (COLUMN_WIDTH + GAP);
            //y pos is current col height + gap
            const y = gridColumns[smallestColumnIndex] + (gridColumns[smallestColumnIndex] > 0 ? GAP : 0);

            // update column height
            gridColumns[smallestColumnIndex] = y + item.height;

            gridArrangedItems.push(
                {
                    width:COLUMN_WIDTH,
                    height:item.height,
                    x: x,
                    y: y
                }
            )
        });
        setContentHeight(Math.max(...gridColumns));
        setGridArrangedItems(gridArrangedItems);
    }

    return (
        <div 
            ref={containerRef}
            className="masonry-grid-container"
            style={{height: '100vh', position: 'relative', overflowY: 'auto', border: '#000 solid 1px'}}
        >
            
            
                {gridArrangedItems.map((_, index) => (
                    <MasonryGridItem
                        key={index}
                        item={mockItems[index]}
                        position={gridArrangedItems[index]}
                    />
                ))}
        </div>
    )
}