/*A react component that represents a mobile menu*/

import React from 'react';

interface MobileMenuProps {
    visible?: boolean; //optional boolean prop.
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
    if (!visible) {
        return null; //if visible false, nothing is rendered
    }
    /*Mobile menu is rendered only when visibility is true */
    return (
        <div
            className="bg-white w-56 absolute top-8 left-0 py-5 
            flex-col border-2 border-gray-500 flex"
        >
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-gray-700 hover:underline">
                    Home
                </div>
                <div className="px-3 text-center text-gray-700 hover:underline">
                    Series
                </div>
                <div className="px-3 text-center text-gray-700 hover:underline">
                    Films
                </div>
                <div className="px-3 text-center text-gray-700 hover:underline">
                    New & Popular
                </div>
                <div className="px-3 text-center text-gray-700 hover:underline">
                    My List
                </div>
                <div className="px-3 text-center text-gray-700 hover:underline">
                    Browse by Languages
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;