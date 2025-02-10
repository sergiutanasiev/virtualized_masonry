import { memo, useRef, useEffect } from "react"
import { MasonryGridItemProps } from "@masonry/types"

export const MasonryGridItem = memo(({item, width, position, observe }: MasonryGridItemProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
    }, [observe]);

    return (
        <div
            ref={ref}
            style={
                    {
                        height: `${position.height}px`,
                        width: `${width}px`,
                        position: 'absolute',
                        transform: `translate(${position.x}px,
                        ${position.y}px)`,
                        border: '#000 solid 1px',
                    }
                }    
        >
            {item.content}
        </div>
    )
})