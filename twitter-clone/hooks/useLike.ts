import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {

    const { data: currentUser } = useCurrentUser(); /* Get the current logged-in
    user data */

    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    /* Get the specific post which is liked using the post id*/

    const { mutate: mutateFetchedPosts } = usePosts(userId);/* */

    const loginModal = useLoginModal(); //handles the login modal

    const hasLiked = useMemo(() => {

        const list = fetchedPost?.likedIds || []; /*Fetches the likes of the
        specific post */

        return list.includes(currentUser?.id); /*Checks if the current user
        has already like the post (If user is in the list of like) */
    }, [fetchedPost, currentUser]);

    const toggleLike = useCallback(async () => {

        /*This function is responsible for toggling the like status of the post */

        if (!currentUser) {
            /*Checks if the user is logged in. If not, it opens the login
            modal */
            return loginModal.onOpen();
        }

        try {

            let request;

            if (hasLiked) {
                /*If user have already liked a post, clicking on the like button
                will remove the like (will result in unlike) */

                request = () => axios.delete('/api/like', { data: { postId } });
            } else {

                {/*If user have not yet like the post, clicking on the like
            button will result in user liking the post or comment*/}
                request = () => axios.post('/api/like', { postId });
            }

            await request();

            mutateFetchedPost(); //manually re-fetch the updated post and list of posts
            mutateFetchedPosts();

            toast.success('Success'); //success notification
        } catch (error) {
            toast.error('Something went wrong'); //error notification
        }
    }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

    return {
        hasLiked,
        toggleLike,
    }
}

export default useLike;