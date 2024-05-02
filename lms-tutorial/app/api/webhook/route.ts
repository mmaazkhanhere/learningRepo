/*Defines a webhook handler function 'POST' that listens for events from the Stripe
webhook endpoint that ensures when a stripe checkout is completed, the corresponding
purchase is recorded in the database */

import Stripe from "stripe";
import { headers } from "next/headers"
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request): Promise<Response> {

    const body = await req.text(); //get the body from the request

    const signature = headers().get("Stripe-Signature") as string; //get stripe signature

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, signature, process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === 'checkout.session.completed') {
        if (!userId || !courseId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId,
            }
        });
    }
    else {
        return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }

    return new NextResponse("Session Completed", { status: 200 });
}
