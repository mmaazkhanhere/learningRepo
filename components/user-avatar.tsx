/*The UserAvatar component is responsible for rendering a user's avatar. 
It uses the useUser hook to fetch user data, including the user's image URL, 
and then displays the avatar using the Avatar and AvatarImage components.  */

"use client"

import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import { useUser } from '@clerk/nextjs';


const UserAvatar = () => {

    const { user } = useUser();

    return (
        <Avatar className='h-12 w-12'>
            <AvatarImage src={user?.imageUrl} />
            {/*passes the user image to AvatarImage ShadcnUI component */}
        </Avatar>
    )
}

export default UserAvatar