/*This comment encapsulates the visual representation of a single comment in 
a comment feed. It includes the user avatar, name, username, creation time, 
and comment body, along with the functionality to navigate the user's profile
page */

import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {

    const router = useRouter(); //access the router object

    const goToUser = useCallback((ev: any) => {
        /*This function uses the router to push a new route that is the user
        profile of a user */

        ev.stopPropagation(); /*Will override the click events of the parent */

        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id]);

    const createdAt = useMemo(() => {
        /*This function calculates the time elapsed since the comment was
        created and formats it */

        if (!data?.createdAt) {
            /*If comment has not been created yet, display nothing */
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <div
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

                        {/*username */}
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

                        {/*When the comment was created */}
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>

                    {/*Body of the comment */}
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;