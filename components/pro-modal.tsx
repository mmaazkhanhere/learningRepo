/*he ProModal component represents a subscription modal that allows users to 
upgrade to a "Pro" version of a service. It uses custom hooks for managing 
the modal state and displaying toast notifications, and it handles HTTP 
requests for subscription initiation.  */

"use client"

import { useProModal } from "@/app/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProModal = () => {

    const proModal = useProModal(); //custom hook to manage the modal pro state
    const { toast } = useToast(); //toaster
    const [loading, setLoading] = useState(false); //loading state varibale
    const [isMounted, setIsMounted] = useState(false); //used to track whether the component has been mounted 

    useEffect(() => {
        /*set the mounted to true when the component is mounted ensuring that 
        certain parts of the compoent are executed only after the inital render */
        setIsMounted(true);
    }, []);

    const onSubscribe = async () => {
        //function is called when Subscribe button is clicked
        try {

            setLoading(true);//sets the loading state to true
            const response = await axios.get('/api/stripe'); //sends a GET hhtp request to endpoint
            window.location.href = response.data.url; /*redirects the user to the URL recieved in 
            the response if successful*/

        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong"
            }) //toast message if error
        }
    }

    if (!isMounted) {
        /*Before rendering the modal content, the code checks whether the component is mounted.
        If it is not, it returns null effectively preventing rendering until the component is mounted */
        return null;
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                {/*Dialog Content */}
                <DialogHeader className="space-y-4">
                    {/*Title of Dialog Box */}
                    <DialogTitle className="text-center">
                        Upgrade to Pro
                    </DialogTitle>
                    {/*Short description message displayed under the text */}
                    <DialogDescription className="text-center space-y-2">
                        Create <span className="text-sky-500 mx-1 font-medium"> Custom AI</span> Companions
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        9
                        <span className="text-sm font-normal">.99 / month</span>
                    </p>
                    <Button disabled={loading} variant={"premium"} onClick={onSubscribe}>
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}