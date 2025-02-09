import { memo } from "react"
import { MasonryGridItemProps } from "../types"

export const MasonryGridItem = memo(({item, position }: MasonryGridItemProps) => {
    return (
        <div
            style={
                    {
                        height: `${position.height}px`,
                        width: `300px`,
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