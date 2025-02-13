import { memo } from "react";
import { Link } from "react-router-dom";
import { ItemPositions, PhotoType } from "../types";

/**
 * Component containing the Virtualized Masonry Grid ITEM
 * @param {PhotoType} photo - Object containing the photo values
 * @param {ItemPositions} positions - Object containing (width, height, x, y) position of item in the grid
 */
export const MasonryGridItem = memo(({
    photo,
    positions,
}: {
    photo: PhotoType,
    positions: ItemPositions
}) => {

    return (
      <div
        style={{
          position: "absolute",
          transform: `translate(${positions.x}px, ${positions.y}px)`,
          width: `${positions.width}`,
          height: `${positions.height}`,
        }}
      >
        <Link to={`/items/${photo.id}`} state={photo} className="masonry-item-link">
            <img
                src={photo.src.small}
                alt={photo.alt}
                srcSet={`
                  ${photo.src.tiny} 280w,
                  ${photo.src.small} 400w,
                  ${photo.src.medium} 800w,
                `}
                style={{ 
                    width: `${positions.width}px`, 
                    height: `${positions.height}px`, 
                    objectFit: "cover",
                    borderRadius: 8
                }}
            />
        </Link>
        
      </div>
    );
})