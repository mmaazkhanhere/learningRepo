/* the SubscriptionButton component represents a button that allows users to manage or 
upgrade their subscriptions. It manages loading state, handles HTTP requests to initiate 
subscription actions, and displays toast notifications for errors.  */

"use client"

import { Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import axios from "axios"


interface SubscriptionButtonProps {
    //interface for the SubscriptionButton component
    isPro: boolean
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {

    const [loading, setLoading] = useState(false); //loading state
    const { toast } = useToast(); //toaster from shadcn

    const onClick = async () => {
        /*function when the button is clicked on and is responsible for calling the stripe apo*/
        try {
            setLoading(true); //the loading state is set to true
            const response = await axios.get("/api/stripe"); //an GET http request is send to specified endpoint
            window.location.href = response.data.url; /*It is redirects the users browser to a new webpage specified
            by the url contained in the response.data object */

        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong"
            })
        }
    }

    return (
        <Button onClick={onClick} disabled={loading} size="sm" variant={isPro ? "default" : "premium"}>
            {
                isPro ? "Manage Subscription" : "Upgrade"
            }
            {
                !isPro && <Sparkles className="h-4 2-4 ml-2 fill-white" />
            }
        </Button>
    )
}