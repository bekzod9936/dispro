import React from "react"
interface ISize {
    width: number,
    height: number
}
export const useWindowSize = () => {
    const [size, setSize] = React.useState<ISize>({
        width: 0,
        height: 0
    })

    function handleResize() {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return { width: size.width, height: size.height }
}