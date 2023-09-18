/*the ImageUpload component allows users to upload and display images. It 
uses the Cloudinary upload button for image uploads, displays the selected 
image (or a placeholder), and provides a callback function (onChange) to handle 
the selected image's URL. The component is conditionally rendered based on its 
mounting state to ensure a smooth user experience. */

"use client"

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image";

interface ImageUploadProps {
    value: string; //url of the currently selected image
    onChange: (src: string) => void; /*A callback function that is called when an image
    is selected or uploaded. It recievs the source of the selected image */
    disabled?: boolean; /*Optional boolean parameter that indicates whether the
    image upload functionality should be disabled */
};

export const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);//local state variable

    useEffect(() => {
        /*useffect used to set the isMounted state to true when the component is mounted
        It ensures that certain parts of the component are executed only after the initial render */
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        /*If it is not yet mounted, returns null effectively preventing rendering until the component is
        mounted */
        return null;
    }

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
                //upload image button for cloudinary and only one item can be uploaded
                onUpload={(result: any) => onChange(result.info.secure_url)}
                options={{
                    maxFiles: 1
                }}
                uploadPreset="rpzilvh6"
            >
                <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg 
                hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center"
                >
                    <div className="relative h-40 w-40">
                        <Image
                            fill
                            alt="Upload"
                            src={value || "/placeholder.svg"}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    )
}