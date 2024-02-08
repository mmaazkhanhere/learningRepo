/*Represents a sidebar navigation menu for the application. It display various
items, including links to different pages, user profile, notifications, and a
logout button.  */

import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            icon: BsHouseFill, //icon to be displayed
            label: 'Home', //label of that navigation item
            href: '/', //where the navigation item will redirect to 
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: '/notifications',
            auth: true,
            alert: currentUser?.hasNotification
        },
        {
            icon: FaUser,
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            auth: true,
        },
    ]

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    {/*Sidebar Logo */}
                    <SidebarLogo />
                    {
                        /*Sidebar items */
                        items.map((item) => (
                            <SidebarItem
                                key={item.href}
                                alert={item.alert}
                                auth={item.auth}
                                href={item.href}
                                icon={item.icon}
                                label={item.label}
                            />
                        ))
                    }

                    {/*If user is logged in, then display the logout button */}
                    {
                        currentUser && <SidebarItem
                            onClick={() => signOut()}
                            icon={BiLogOut}
                            label="Logout"
                        />
                    }
                    {/*Tweet button */}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
};

export default Sidebar;