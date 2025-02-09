import { useEffect, useRef, useState, useMemo } from "react";

interface ItemType {
    id: number,
    height: number,
    content: string
}

interface ItemPositions {
    width: number,
    height: number,
    x: number,
    y: number
}

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
    const [gridArrangedItems, setGridArrangedItems] = useState<ItemPositions[]>([]);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        generateMasonryGridLayout();
    }, [])

    const observerResize = useMemo(() => (
        new ResizeObserver((entries) => {
            setContainerWidth(Math.floor(entries[0].contentRect.width));
        })
    ), []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            observerResize.observe(container);
        return () => observerResize.unobserve(container);
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
        setGridArrangedItems(gridArrangedItems);
    }

    return (
        <div 
            ref={containerRef}
            className="masonry-grid-container"
            style={{height: '100vh', position: 'relative', overflowY: 'auto', border: '#000 solid 1px'}}
        >
            {containerWidth}
            <div style={{ height: 'auto', position: 'relative' }}>
                {gridArrangedItems.map((item, i) => (
                    <div
                        style={
                            {
                                height: `${item.height}px`,
                                width: `${COLUMN_WIDTH}px`,
                                position: 'absolute',
                                transform: `translate(${item.x}px,
                                ${item.y}px)`,
                                border: '#000 solid 1px',
                            }
                        }
                        key={i}
                    >{i}</div>
                ))}
            </div>
            
        </div>
    )
}