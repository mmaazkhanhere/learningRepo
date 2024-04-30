/*A react component responsible for handling file uploads using UploadDropzone and
handle successful uploads and error cases */

"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core"
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void; /*a function that will be called when the
    upload is complete receiving the URL of the uploaded file as an argument */

    endpoint: keyof typeof ourFileRouter /*Specifies the endpoint to which the
    file should be uploaded. It is the key of ourFileRouter which defines the
    available upload endpoints */
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}  //specifies the endpoint for file upload
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }} /*callback function called when the upload is complete on the client side.
            It extracts the URL of the uploaded file from the response and calls
            the onCHange function with this URL*/
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`)
            }} /*Callback function called when an error occurs during the upload
            process. It displays an error toast with the error message */
        />
    )
}