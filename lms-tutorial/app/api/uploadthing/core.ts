/*This code is copied from uploadthings website. This code set ups secure file 
upload routes for different types of course-related files, ensuring that only
authorized users can upload files */

import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

/*This function is used for authentication handling. It gets the user id from the
auth function and checks if the userId is present and that the user is a teacher.
If it is not, an unauthorized error message is returned else the userId is returned*/
const handleAuth = () => {

    const { userId } = auth();
    const isAuthorized = isTeacher(userId);
    if (!userId || !isAuthorized) throw new Error("Unauthenticated");
    return { userId }
}

/*This function defines routes for uploading files related to courses. */
export const ourFileRouter = {

    /*Configuration for uploading images. It limits the file size to 4MB
    and allow only one file to be uploaded at a time */
    courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    /*Configuration for uploading course attachments. It defines types of
    attachment that can be uploaded as course attachment */
    courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    /*Configuration for uploading course chapter video. Only one video can be
    uploaded in a chapter. The maximum size of the file is 512 GB */
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '512GB' } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

} satisfies FileRouter; /*This assertion ensures that ourFileRouter satisfies the 
FileRouter type */

export type OurFileRouter = typeof ourFileRouter;