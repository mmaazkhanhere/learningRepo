/*This component encapsulates the rendering logic for a single post item,
including user information, post content, interaction buttons, and event
handling */

import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';

interface PostItemProps {
    data: Record<string, any>; /*object containing post record */
    userId?: string; //optional string representing the Id of the current user
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {

    const router = useRouter(); //navigation handling

    const loginModal = useLoginModal(); //login modal handling

    const { data: currentUser } = useCurrentUser(); /*data of the current user
    logged in */

    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

    const goToUser = useCallback((ev: any) => {
        /*function that is used to navigate to the user profile page when a user
        clicks on the username or avatar associated with the post */

        ev.stopPropagation(); /*prevents the click event from propagating further
        to avoid triggering the 'onClick' event of the parent element */

        router.push(`/users/${data.user.id}`) //navigate to the user profile page

    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        /*This function is used to navigate to the detailed view of a post when 
        the user clicks on the post item. */

        router.push(`/posts/${data.id}`); /*construct the URL using post id and
        navigates to that URL */

    }, [router, data.id]);

    const onLike = useCallback(async (ev: any) => {
        /*This function is used to handle the like action when the user clicks
        on the like button */

        ev.stopPropagation();

        if (!currentUser) {
            //checks if the user is logged in. If not, login modal is opened
            return loginModal.onOpen();
        }

        toggleLike();/*If there is a logged-in user, it calls the toggleLike
        function, which toggles the like status of the post */

    }, [loginModal, currentUser, toggleLike]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart; /*different icons,
    depending on whether the user has liked or not */

    const createdAt = useMemo(() => {
        /*Calculate the relative creation time of a post and memoize the result */

        if (!data?.createdAt) {
            /*If the post is not created yet, nothing is returned */
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));/*If the post
        exists, it converts the creation timestamp to Javascript Date object 
        and calculates the distance between that time and the current time in
        a strict manner */

    }, [data.createdAt])

    return (
        <div
            onClick={goToPost}
            className="
                border-b-[1px] 
                border-neutral-800 
                p-5 
                cursor-pointer 
                hover:bg-neutral-900 
                transition
            ">
            <div className="flex flex-row items-start gap-3">
                {/*User Avatar */}
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        {/*User name */}
                        <p
                            onClick={goToUser}
                            className="
                                text-white 
                                font-semibold 
                                cursor-pointer 
                                hover:underline
                            ">
                            {data.user.name}
                        </p>
                        {/*Username */}
                        <span
                            onClick={goToUser}
                            className="
                                text-neutral-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
                            ">
                            @{data.user.username}
                        </span>

                        {/*Time of creation */}
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>

                    {/*Body of the post */}
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        {/*Comments */}
                        <div
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-sky-500
                            ">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>

                        {/*Likes */}
                        <div
                            onClick={onLike}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-red-500
                            ">
                            <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;