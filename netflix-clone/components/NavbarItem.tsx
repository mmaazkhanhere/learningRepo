/*a React functional component that represents an item in a navigation bar */

import React from 'react';

interface NavbarItemProps {
    label: string;
    active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
    return (
        <div
            className={active ? 'text-gray-700 cursor-default' : 'text-black hover:text-gray-600 cursor-pointer transition'}>
            {label}
        </div>
    )
}

export default NavbarItem;