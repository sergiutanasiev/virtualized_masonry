import { memo } from "react";
import { Link } from "react-router-dom";

export const MasonryGridItem = memo(({
    photo,
    id, 
    src, 
    alt,
    positions,
}: Record<any, any>) => {

    return (
      <div
        style={{
          position: "absolute",
          transform: `translate(${positions.x}px, ${positions.y}px)`,
          width: `${positions.width}`,
          height: `${positions.height}`,
        }}
      >
        <Link to={`/items/${id}`} state={photo} className="masonry-item-link">
            <img
                src={src}
                alt={alt}
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