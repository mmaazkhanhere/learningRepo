/*A React component that renders a tweet button that allow users to compose a 
new tweet. It dynamically handles click event based on whether a user is logged
in or not. If the user is not logged in, the login modal is opened. If they
are logged in, click on it redirects them to homepage */

import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
    const router = useRouter(); //hook for navigation
    const loginModal = useLoginModal(); //hook to manage the state of the login modal
    const { data: currentUser } = useCurrentUser(); /*fetch the current user
    data */

    const onClick = useCallback(() => {
        /*Handles click event */
        if (!currentUser) {
            /*If user is not logged in, the login modal is opened */
            return loginModal.onOpen();
        }
        /*Else the user is redirected to homepage */
        router.push('/');
    }, [loginModal, router, currentUser]);

    return (
        <div onClick={onClick}>
            {/*Icon */}
            <div className="
                mt-6
                lg:hidden 
                rounded-full 
                h-14
                w-14
                p-4
                flex
                items-center
                justify-center 
                bg-sky-500 
                hover:bg-opacity-80 
                transition 
                cursor-pointer
            ">
                <FaFeather size={24} color="white" />
            </div>

            {/*Text */}
            <div className="
                mt-6
                hidden 
                lg:block 
                px-4
                py-2
                rounded-full
                bg-sky-500
                hover:bg-opacity-90 
                cursor-pointer
            ">
                <p
                    className="
                    hidden 
                    lg:block 
                    text-center
                    font-semibold
                    text-white 
                    text-[20px]
                ">
                    Tweet
                </p>
            </div>
        </div>
    );
};

export default SidebarTweetButton;