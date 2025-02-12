import { useMemo } from "react";

export const useVisibleGridItems = ({
    gridArrangedItems,
    scrollTop,
    containerHeight,
    viewportBuffer,
}): number[] => {
    return useMemo(() => {
        const startY = scrollTop - viewportBuffer;
        const endY = scrollTop + containerHeight + viewportBuffer;
        const visibleItems: number[] = [];
        gridArrangedItems.forEach((positions, index) => {
            // If the item overlaps with the viewport (plus buffer), add its index.
            if (positions.y + positions.height > startY && positions.y < endY) {
                visibleItems.push(index);
            }
        });
        console.log(gridArrangedItems)
        return visibleItems;
    }, [gridArrangedItems, scrollTop, containerHeight, viewportBuffer]); 
}