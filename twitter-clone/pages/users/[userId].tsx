import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";



const UserView = () => {
    const router = useRouter(); /*router hook is used to access the router object */
    const { userId } = router.query; /*userId is extracted from the router's
    query parameters */

    const { data: fetchedUser, isLoading } = useUser(userId as string);/*fetch
    user data based on the userId */

    if (isLoading || !fetchedUser) {
        /*If data is missing or is in loading state, display a loading spinner */
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string} />
        </>
    );
}

export default UserView;