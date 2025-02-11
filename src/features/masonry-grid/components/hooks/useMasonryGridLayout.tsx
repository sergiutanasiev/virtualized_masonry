import { useCallback, useMemo } from "react"
import { ItemType, ItemPositions } from "../../types"

export const useMasonryGridLayout = (
    photos: unknown | undefined,
    columnWidth: number,
    columns: number,
    gap: number
) => {
    const generateLayout = useCallback(() => {
        
        const gridColumns = Array(columns).fill(0);
    
        const gridArrangedItems: ItemPositions[] = [];

        // itterate items and add next item to the smallest array in height. 
        // height is represented by a the sum of all items heights added to that column
        photos.forEach((photo: any) => {
            const resizedHeight = Math.floor((photo.width / photo.height) * columnWidth);

            // identify smallest column
            const smallestColumnIndex = gridColumns.indexOf(Math.min(...gridColumns));

            //x pos ex for col2: 1 * (300 + 20); x is 320px
            const x = smallestColumnIndex * (columnWidth + gap);
            //y pos is current col height + gap
            const y = gridColumns[smallestColumnIndex] + (gridColumns[smallestColumnIndex] > 0 ? gap : 0);

            // update column height
            gridColumns[smallestColumnIndex] = y + resizedHeight;
            

            gridArrangedItems.push(
                {
                    id: photo.id,
                    width:columnWidth,
                    height:resizedHeight,
                    x: x,
                    y: y
                }
            )
        });

        return {
            gridArrangedItems
        }

    }, [photos, columnWidth, columns, gap]);

    return useMemo(() => generateLayout(), [generateLayout]);
}