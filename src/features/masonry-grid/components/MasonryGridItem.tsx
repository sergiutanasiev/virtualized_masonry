import { memo, useRef, useEffect } from "react"
import { MasonryGridItemProps } from "@masonry/types"

export const MasonryGridItem = memo(({
    id, 
    src, 
    alt,
    positions,
}: MasonryGridItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
  
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          transform: `translate(${positions.x}px, ${positions.y}px)`,
          width: `${positions.width}`,
          height: `${positions.height}`,
        }}
      >
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
      </div>
    );
})