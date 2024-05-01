/*A react component for rendering read-only preview of rich text content */

"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css"

interface PreviewProps {
    value: string;
}

export const Preview = ({ value }: PreviewProps) => {

    /*Utilizes the dynamic function from nextjs to import react quill component that
    is done along ssr:false to ensure that the component is not included in the
    server side rendering */

    /*Dynamic import refers to ability to import components asynchronously, ensuring
    that they are only loaded on the client side which can improve performance
    by reducing the initial load time of your application */
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return (
        <div
            className="bg-white"
        >
            {/*Display the text edit using ReactQuill Component */}
            <ReactQuill
                theme="bubble"
                value={value}
                readOnly
            />
        </div>
    )
}