/*A reuseable avatar component that fetches the user's profile image based on
the userId and clicking on the avatar navigates the user to their profile page. */

import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {

    const router = useRouter();//for navigation

    const { data: fetchedUser } = useUser(userId); /*The useUser hook is used
    to fetch user data based on the userId */

    const onClick = useCallback((event: any) => {

        /*A callback function is defined that navigates to the user's profile
        page when the avatar is clicked */

        event.stopPropagation(); /*stops the event from reaching the parent
        element or any other elements that may be listening for the same event */

        const url = `/users/${userId}`; //url of the users profile

        router.push(url); //url pushed to the router
    }, [router, userId]);

    return (
        <div
            className={`
                ${hasBorder ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full 
                hover:opacity-90 
                transition 
                cursor-pointer
                relative
            `}
        >
            {/*Image */}

            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || '/images/placeholder.png'}
            />
        </div>
    );
}

export default Avatar;