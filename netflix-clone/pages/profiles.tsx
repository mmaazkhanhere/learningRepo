/*This code represents a simple profile selection UI for an authenticated user.
It uses NextAUth for authentication, displays a lost of user cards with randomly
selected images, and allows the user to select a profile */

import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
]

interface UserCardProps {
    name: string;
}

export async function getServerSideProps(context: NextPageContext) {
    /*getServerSideProps is a special function that runs on the server side
    before the page is run */

    const session = await getSession(context); /*uses getSession to check if a
    user is authenticated */

    if (!session) {
        /*If the user is not authenticated, it redirects to the auth page */
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {

    /* A functional component that represents a user card with a randomly
    selected image and a name. */

    const imgSrc = images[Math.floor(Math.random() * 4)];

    return (
        <div className="group flex-row w-44 mx-auto">
            <div
                className="w-44 h-44 rounded-md flex items-center 
                justify-center border-2 border-transparent 
                group-hover:cursor-pointer group-hover:border-white
                overflow-hidden"
            >
                <img
                    draggable={false}
                    className="w-max h-max object-contain"
                    src={imgSrc}
                    alt="Profile Logo"
                />

            </div>
            <div
                className="mt-4 text-gray-400 text-2xl text-center 
                group-hover:text-white"
            >
                {name}
            </div>
        </div>
    );
}

const App = () => {
    const router = useRouter(); //uses router to handle navigation
    const { data: currentUser } = useCurrentUser(); /*uses the useCurrentUser hook
    to fetch information about the currently signed-in user */

    const selectProfile = useCallback(() => {
        /*a function which is called when clicking on a user card navigates to
        home page*/
        router.push('/');
    }, [router]);

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who&#39;s watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => selectProfile()}>
                        <UserCard name={currentUser?.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;