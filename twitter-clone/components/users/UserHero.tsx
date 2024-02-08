/*A React component responsible for rendering the hero section of a user's 
profile that includes a cover image and the user's avatar */

import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {

    const { data: fetchedUser } = useUser(userId); /*fetching user data based
    on user id */

    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {/*If user has uploaded a cover image, the image component is
                rendered */}
                {
                    fetchedUser?.coverImage && (
                        <Image
                            src={fetchedUser.coverImage}
                            fill
                            alt="Cover Image"
                            style={{ objectFit: 'cover' }}
                        />
                    )
                }

                {/*User avatar */}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
}

export default UserHero;