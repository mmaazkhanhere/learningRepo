/*This component fetches notifications for the current user using the custom 
hook, displays them in a feed format, and ensures that the current user's data
is up to date by triggering a mutation when mounted or updated. If there is no
notifications, it display a message indicating so */

import { BsTwitter } from "react-icons/bs";

import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const NotificationsFeed = () => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    /*fetches the current user*/

    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
    /*fetches the notification for the current user */

    useEffect(() => {
        mutateCurrentUser(); //manually refetch the current user data
    }, [mutateCurrentUser]);

    if (fetchedNotifications.length === 0) {
        /*If no notification exists, a message is displayed */
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No notifications
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {
                /*mapping over the fetched notification data */

                fetchedNotifications.map((notification: Record<string, any>) => (
                    <div
                        key={notification.id}
                        className="flex flex-row items-center p-6 gap-4 
                        border-b-[1px] border-neutral-800"
                    >
                        {/*Twitter logo */}
                        <BsTwitter color="white" size={32} />

                        {/*Notification */}
                        <p className="text-white">
                            {notification.body}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default NotificationsFeed;