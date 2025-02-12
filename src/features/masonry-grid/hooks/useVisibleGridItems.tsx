import { useMemo } from "react";
import { VisibleGridItemsType } from "../types";

/**
 * Custom Hook responsible for handling virtualization of grid items. Assigning wich indexes should be rendered in the DOM
 * @param {ItemPositions[]} gridArrangedItems - Array containing a collection of items with assigned x and ypositon in the grid
 * @param {number} scrollTop - Current position from top
 * @param {number} containerHeight - height of the container holding all the items in the grid
 * @param {number} viewportBuffer - Size of the buffer to trigger a fetch request or loading more grid arranged items
 */
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