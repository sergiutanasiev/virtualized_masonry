export interface PhotoType {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked: boolean;
    alt: string;
}

export interface PexelRequestReponse {
    page: number;
    per_page: number;
    photos: PhotoType[];
    total_results: number;
    next_page: string;
}

export interface ItemPositions {
    id: number;
    width: number;
    height: number;
    x: number;
    y: number
}

export interface VisibleGridItemsType {
    gridArrangedItems: ItemPositions[];
    scrollTop: number;
    containerHeight: number;
    viewportBuffer: number;
}