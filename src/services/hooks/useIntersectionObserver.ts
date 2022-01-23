import React from 'react'
interface Intersection {
    root: any,
    target: any,
    onIntersect: any,
    threshold: any,
    rootMargin: any,
    enabled: any
}
export default function useIntersectionObserver({
    root,
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = '0px',
    enabled = true,
}: any) {
    React.useEffect(() => {
        if (!enabled) {
            return
        }

        const observer = new IntersectionObserver(
            entries =>
                entries.forEach(entry => entry.isIntersecting && onIntersect()),
            {
                root: root && root.current,
                rootMargin,
                threshold,
            }
        )

        const el = target && target.current

        if (!el) {
            return
        }

        observer.observe(el)

        return () => {
            observer.unobserve(el)
        }
    }, [target.current, enabled])
}