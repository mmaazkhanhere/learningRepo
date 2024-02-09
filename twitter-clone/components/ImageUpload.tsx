/*This component creates an image upload area where user can drop an image file.
It then displays the uploaded image preview along with the label provided. The
uploaded image is converted to a base64 string to facilitate preview */

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        /*A hook to memoize its reference. Calls the onChange prop with the
        base64 string as an argument */
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        /*This function is triggered when a file is dropped into the dropzone */

        const file = files[0]
        const reader = new FileReader(); /*Reads the dropped file using File
        Reader and converts it to base64 format */

        reader.onload = (event: any) => {
            /*onload event listener is set on the reader object, which is fired
            when the file reading operation is successfully completed */

            setBase64(event.target.result); /*updates the base64 state variable
            with the base64-encoded data, which triggers a re-render to display
            the uploaded image preview */
            handleChange(event.target.result); /*function is responsible for
            propagating the image data to the parent component */
        };
        reader.readAsDataURL(file); /*starts reading the contents of the
        specified files. When the reading is completed, the onload event is
        triggered */
    }, [handleChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, /*The maximum number of files that can be dropped into the
                    dropzone. */
        onDrop: handleDrop, /*Specifies the function to be called when files are
        dropped into the dropzone. handleDrop function is provided as callback
        to handle the dropped files */
        disabled, //determines whether the dropzone is disabled or enabled
        accept: { //specifies the type of files that are accepted by the dropzone
            'image/jpeg': [],
            'image/png': [],
        }
    });

    return (
        <div {...getRootProps({ className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700' })}>
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            height="100"
                            width="100"
                            alt="Uploaded image"
                        />
                    </div>
                ) : (
                    <p className="text-white">{label}</p>
                )
            }
        </div>
    );
}

export default ImageUpload;