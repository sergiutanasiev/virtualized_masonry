export function throttle <T extends (...args: any[]) => void>(callback: T, delay: number): T {
    let timeLastCall = 0;
    return function(...args) {
        const timeNow = Date.now();
        if (timeNow - timeLastCall >= delay) {
            timeLastCall = timeNow;
            callback(...args)
        }
    } as T
}