/*This code is copied from the uploadthing website as recommended. This code set ups
route handles for file uploads using the configuration defined in the ourFileRouter
allowing the application to handle file upload requests*/

import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";


export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});