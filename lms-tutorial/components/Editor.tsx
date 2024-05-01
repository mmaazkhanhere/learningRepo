"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css"

interface EditorProps {
    onChange: (value: string) => void;
    value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {

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
            {/*Edit using ReactQuill Component */}
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}