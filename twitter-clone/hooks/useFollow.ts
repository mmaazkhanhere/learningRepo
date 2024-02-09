import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    /*fetch the data of the currently logged-in user */

    const { mutate: mutateFetchedUser } = useUser(userId);/*fetch the data of 
    the user to be followed or unfollow */

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        /*uses useMemo hook to determine if the current user is already following
        the user. useMemo is a good practice here because it re-renders the 
        component only if the current user or the user id of the profile changes*/
        const list = currentUser?.followingIds || [];

        return list.includes(userId);/*checks whether the userId is included
        in the current user following list */

    }, [currentUser, userId]);

    const toggleFollow = useCallback(async () => {

        /*This function is called when the user clicks the follow/unfollow 
        button */
        if (!currentUser) {
            //if no user is logged in, the login modal is opened
            return loginModal.onOpen();
        }

        try {
            let request;

            /*If user already follows the user, clicking the button will
            result in user to unfollow. If user is not followed, clicking the
            button will result in following them */
            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();

            mutateCurrentUser();//manually fetch the current user and updated user
            mutateFetchedUser();

            toast.success('Success'); //success notification
        } catch (error) {
            toast.error('Something went wrong'); //error notification
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow;