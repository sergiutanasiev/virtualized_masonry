export interface ItemType {
    id: number,
    height: number,
    content: string
}

export interface ItemPositions {
    id: number,
    width: number,
    height: number,
    x: number,
    y: number
}

export interface MasonryGridItemProps {
    item: ItemType,
    position: ItemPositions,
    observe?: (element: HTMLElement | null) => void
}
