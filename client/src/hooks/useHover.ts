import {useState, useEffect, useRef} from "react"

interface hoverInterface {
    ref: (instance: HTMLDivElement | null) => void | React.RefObject<HTMLDivElement> | null | undefined;
}

function useHover(): [boolean, React.MutableRefObject<HTMLInputElement | null>] {
    const [hovered, setHovered] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement|null>(null)
    
    function enter() {
        setHovered(true)
    }
    
    function leave() {
        setHovered(false)
    }
    
    useEffect(() => {
        if (ref.current != null) {
            ref.current.addEventListener("mouseenter", enter)
            ref.current.addEventListener("mouseleave", leave)
        }
    }, [])
    
    return [hovered, ref]
}

export default useHover
