export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'largeDesktop';

export interface BreakpointType {
    breakpoint: number,
    columns: number,
    gap: number
}

const viewportBuffer: number = 250;

export const breakpointsList: Record<Breakpoint, BreakpointType> = {
    mobile: {
        breakpoint: 480,
        columns: 2,
        gap: 10
    },
    tablet: {
        breakpoint: 768,
        columns: 3,
        gap: 10
    },
    desktop: {
        breakpoint: 1024,
        columns: 4,
        gap: 20
    },
    largeDesktop: {
        breakpoint: 1440,
        columns: 5,
        gap: 20
    }
}

export function getCurrentBreakpoint(screenWidth: number): Breakpoint  {
    if (screenWidth <= breakpointsList.mobile.breakpoint) {
        return "mobile"
    }
    if (screenWidth <= breakpointsList.tablet.breakpoint) {
        return "tablet"
    }
    if (screenWidth <= breakpointsList.desktop.breakpoint) {
        return "desktop"
    }
    return "largeDesktop";
}

export function getColumnWidthandGap(screenWidth: number): Record<string, number>{
    const index = getCurrentBreakpoint(screenWidth);
    const { columns, gap } = breakpointsList[index];
    const totalGapSpace = gap * (columns - 1);
    const columnWidth = (screenWidth - totalGapSpace) / columns;
    return {columnWidth, columns, gap, viewportBuffer};
}