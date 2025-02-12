import { useMemo } from "react";
import { VisibleGridItemsType } from "../types";

export const useVisibleGridItems = ({
    gridArrangedItems,
    scrollTop,
    containerHeight,
    viewportBuffer,
}: VisibleGridItemsType): number[] => {
    
    return useMemo(() => {
        const startY = scrollTop - viewportBuffer;
        const endY = scrollTop + containerHeight + viewportBuffer;
        const visibleItems: number[] = [];

        gridArrangedItems.forEach((positions, index) => {
            if (positions.y + positions.height > startY && positions.y < endY) {
                visibleItems.push(index);
            }
        });
        return visibleItems;

    }, [gridArrangedItems, scrollTop, containerHeight, viewportBuffer]); 
}