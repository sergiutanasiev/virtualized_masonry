import { useCallback, useMemo } from "react"
import { ItemPositions, PhotoType } from "../types"

/**
 * Custom Hook responsible for generating the number of columns and item positions in the grid
 * @param {PhotoType[]} photos - Array containing a collection of items received from fetch request
 * @param {number} columnWidth - Width of a column for current screen size
 * @param {number} columns - Number of columns for current screen size
 * @param {number} gap - Size of the gap between columns and items in a grid, based on the current screen size
 */
export const useMasonryGridLayout = (
    photos: PhotoType[],
    columnWidth: number,
    columns: number,
    gap: number
) => {
    const generateLayout = useCallback(() => {
        
        const gridColumns = Array(columns).fill(0);
    
        const gridArrangedItems: ItemPositions[] = [];

        // Itterate items and add next item to the smallest array in height. 
        // Height is represented by a the sum of all items heights added to that column
        photos.forEach((photo: PhotoType) => {
            const resizedHeight: number = Math.floor((photo.width / photo.height) * columnWidth);

            // Identify smallest column
            const smallestColumnIndex: number = gridColumns.indexOf(Math.min(...gridColumns));

            //x pos ex for col2: 1 * (300 + 20); x is 320px
            const x: number = smallestColumnIndex * (columnWidth + gap);
            //y pos is current col height + gap
            const y: number = gridColumns[smallestColumnIndex] + (gridColumns[smallestColumnIndex] > 0 ? gap : 0);

            // Update column height
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
            gridArrangedItems, contentHeight: Math.max(...gridColumns)
        }

    }, [photos, columnWidth, columns, gap]);

    return useMemo(() => generateLayout(), [generateLayout]);
}