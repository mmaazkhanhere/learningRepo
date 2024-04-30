/*This code is copied from the UploadThing website as recommended, with slight
tweaks. This code snippets imports and utilizes function ti generate upload button
and dropzone components */

import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
