/*sets up a Next.js page component for the notifications page. It ensures that
only authenticated user can access the notifications page by checking the
session data using getServerSideProps. If a user is not authenticated, they are
redirected to the home page. Otherwise, the notification page is rendered with
the appropriate header and notification feed */

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {

    /*An async function used to fetch data and provide it as props to the page
    component. It receives the context object representing the request context. */

    const session = await getSession(context);

    if (!session) {
        /*If user is not authenticated, the are redirected to homepage */
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        /*If session is found, it returns an object containing the session 
        as props */
        props: {
            session
        }
    }
}

const Notifications = () => {
    return (
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>
    );
}

export default Notifications;