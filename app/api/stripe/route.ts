/*this code handles subscription management for users in a web application. It allows 
users to either access their billing information through Stripe's billing portal 
(if they have an active subscription) or initiate a new subscription checkout session 
(if they don't have an active subscription) */

import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth(); //get the userId
        const user = await currentUser(); //get the current user information

        if (!userId || !user) {
            //if no authenticated user is present, return 401 status
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            /*queries the databse using Prisma to retrieve a user's subscription infomration.
            The userSubscrption object will contain details about the user's subscription */
            where: {
                userId
            }
        })

        if (userSubscription && userSubscription.stripeCustomerId) {
            /*If a user subscription exists and it has a customer id, it means user have active 
            subscription with stripe */
            const stripeSession = await stripe.billingPortal.sessions.create({
                /*a stripe billing portal is created using above apo (stripe.billingP.....) */
                customer: userSubscription.stripeCustomerId,/*Specifies the stripe customer id
                to which the billing portal session is associated */
                return_url: settingsUrl, /*specifies url to redirect to user after billing session */
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
            /*If the billing portal successfully created, the code returns a JSON response
            containing the URL of the billing portal session */
        }

        const stripeSession = await stripe.checkout.sessions.create({
            /*If the user doesnt have active subscription, createds a new subscription success */
            success_url: settingsUrl, //define the URL to redirect when checkout complets
            cancel_url: settingsUrl, //define the URL to redirect when checkout fails
            payment_method_types: ["card"], //payment method which is by card
            mode: "subscription", //indicates that the checkout is of subscription
            billing_address_collection: "auto", //collect billing information automatically
            customer_email: user.emailAddresses[0].emailAddress, //set to customer email
            line_items: [ //defines the subscription being purchased
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Companion Pro",
                            description: "Create Custom AI Companions"
                        },
                        unit_amount: 999,
                        recurring: {
                            interval: "month" //indicates that the subscription is monthly base
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,//includes custom meta data
            },
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        console.log("[STRIPE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};