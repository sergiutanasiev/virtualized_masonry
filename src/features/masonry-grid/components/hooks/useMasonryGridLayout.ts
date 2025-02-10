import { useCallback, useMemo } from "react"
import { ItemType, ItemPositions } from "../../types"

export const useMasonryGridLayout = (
    items: ItemType[],
    columnWidth: number,
    gap: number,
    containerWidth: number
) => {
    const generateLayout = useCallback(() => {
        if (!containerWidth) {
            return {
                gridArrangedItems: [], contentHeight: 0
            }
        }

        // Min number of columns is 2(for mobile)
        const numColumns = Math.max(2, Math.floor((containerWidth + gap) / (columnWidth + gap)));
        const gridColumns = Array(numColumns).fill(0); 
    
        const gridArrangedItems: ItemPositions[] = [];

        // itterate items and add next item to the smallest array in height. 
        // height is represented by a the sum of all items heights added to that column
        items.forEach((item) => {
            // identify smallest column
            const smallestColumnIndex = gridColumns.indexOf(Math.min(...gridColumns));

            //x pos ex for col2: 1 * (300 + 20); x is 320px
            const x = smallestColumnIndex * (columnWidth + gap);
            //y pos is current col height + gap
            const y = gridColumns[smallestColumnIndex] + (gridColumns[smallestColumnIndex] > 0 ? gap : 0);

            // update column height
            gridColumns[smallestColumnIndex] = y + item.height;

            gridArrangedItems.push(
                {
                    id: item.id,
                    width:columnWidth,
                    height:item.height,
                    x: x,
                    y: y
                }
            )
        });

        return {
            gridArrangedItems,
            contentHeight: Math.max(...gridColumns)
        }

    }, [items, columnWidth, gap, containerWidth]);

    return useMemo(() => generateLayout(), [generateLayout]);
}