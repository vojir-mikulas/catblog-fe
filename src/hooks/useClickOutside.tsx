import React, {useEffect, useRef} from "react";

const useClickOutside = (handler: () => void) => {
    let domNode = useRef()

    //TODO: add types
    useEffect(() => {
        let maybeHandler = (e: any) => {
        // @ts-ignore
            if (!domNode.current?.contains(e.target)) {
                handler();
            }
        }
        // @ts-ignore
        document.addEventListener("mousedown", maybeHandler)
        return () => {
        // @ts-ignore
            document.removeEventListener("mousedown", maybeHandler)
        }
    })

    return domNode
}

export default useClickOutside