export interface ItemType {
    id: number,
    height: number,
    content: string
}

export interface ItemPositions {
    width: number,
    height: number,
    x: number,
    y: number
}

export interface MasonryGridItemProps {
    item: ItemType,
    position: ItemPositions
}
