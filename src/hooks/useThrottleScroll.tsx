import { useState, useEffect } from "react";

export const useThrottledScroll = () => {
    const [scrollTop, setScrollTop] = useState(window.scrollY);

    useEffect(() => {
        let tick = false;

        const handleScroll = () => {
            if (!tick) {
                requestAnimationFrame(() => {
                    setScrollTop(window.scrollY);
                    tick = false;
                });
                tick = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollTop;
};