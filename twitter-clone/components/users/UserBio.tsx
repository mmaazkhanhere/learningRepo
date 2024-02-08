/*React component that provides a comprehensive view of the user's bio
information allowing users to view and interact with relevant profile details */

import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {

    const { data: currentUser } = useCurrentUser(); /*fetch data related to the
    current user and retrieves information like name, username, bio etc */

    const { data: fetchedUser } = useUser(userId);/*The user whose profile is 
    being viewed which accept userId as a parameter indicating the ID of
    the user whose information is to be fetched*/

    const editModal = useEditModal(); //manages the state of edit modal

    const { isFollowing, toggleFollow } = useFollow(userId); /*handle follow
    action such as toggling the follow status of a user */

    const createdAt = useMemo(() => {
        /*a useMemo hook that calculates and formats the join date of the user
        whose profile is being viewed */

        if (!fetchedUser?.createdAt) {
            /*first checks if the createdAt property exists in the fetched user.
            If it doesn't it returns null */
            return null;
        }

        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');/*converts
        the timestamp stored in fetched user to JavaScript date and format the
        date into "Month Year" */

    }, [fetchedUser?.createdAt])


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">

            {/*Button */}
            <div className="flex justify-end p-2">
                {
                    currentUser?.id === userId ? (
                        <Button secondary label="Edit" onClick={editModal.onOpen} />
                        /*We are looking at our own profile */
                    ) : (
                        <Button
                            onClick={toggleFollow}
                            label={isFollowing ? 'Unfollow' : 'Follow'}
                            secondary={!isFollowing}
                            outline={isFollowing}
                        /> /*We are looking at someone else profile */
                    )
                }
            </div>

            <div className="mt-8 px-4">

                {/*User name and username */}
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.username}
                    </p>
                </div>


                <div className="flex flex-col mt-4">
                    {/*User bio */}

                    <p className="text-white">
                        {fetchedUser?.bio}
                    </p>

                    {/*Date of joining */}
                    <div
                        className="
                            flex 
                            flex-row 
                            items-center 
                            gap-2 
                            mt-4 
                            text-neutral-500
                        ">
                        <BiCalendar size={24} />
                        <p>
                            Joined {createdAt}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row items-center mt-4 gap-6">

                    {/*Following count */}
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {fetchedUser?.followingIds?.length}
                        </p>
                        <p className="text-neutral-500">Following</p>
                    </div>

                    {/*Follower count */}
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {fetchedUser?.followersCount || 0}
                        </p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBio;