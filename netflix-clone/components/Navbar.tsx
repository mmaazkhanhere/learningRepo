import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    //manages the visibility of account dropdown menu
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    //manages the visibility of mobile menu
    const [showBackground, setShowBackground] = useState(false);
    /*determines whether a background style is should be applied based on the
    scroll position*/

    useEffect(() => {
        /*used to add an event listener for scroll events and update the 
        background state based on the scroll postion*/

        const handleScroll = () => {
            console.log(window.scrollY)
            if (window.scrollY >= TOP_OFFSET) {
                /*If user scroll below the offset, the background is shown */
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll); /*event listener
        for scroll events is added when the component mounts */

        return () => {
            window.removeEventListener('scroll', handleScroll); /*event listener
            is removed when the component unmounts */
        }
    }, []);

    const toggleAccountMenu = useCallback(() => {
        //toggle the visibility of the account menu
        setShowAccountMenu((current) => !current);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        //toggle the visibility of the mobile menu
        setShowMobileMenu((current) => !current);
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center 
                transition duration-500 
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}
            >
                {/*Netflix Logo */}
                <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
                {/*Navbar Items */}
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" active />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                { /*Mobile Menu Icon*/}
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 
                    ml-8 cursor-pointer relative"
                >
                    {/* When click on this div, the mobile menu will be displayed*/}
                    <p className="text-gray-700 text-sm">Browse</p>
                    <ChevronDownIcon
                        className={`w-4 text-gray-700 fill-black transition 
                        ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                    {/*Will be visible when showMobileMenu is true*/}
                </div>


                <div className="flex flex-row ml-auto gap-7 items-center">
                    {/*Search Icon */}
                    <div
                        className="text-gray-700 hover:text-black 
                        cursor-pointer transition"
                    >
                        <MagnifyingGlassIcon className="w-6" />
                    </div>
                    {/*Notification Icon */}
                    <div
                        className="text-gray-700 hover:text-black 
                        cursor-pointer transition"
                    >
                        <BellIcon className="w-6" />
                    </div>
                    {/*Profile Section */}
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer 
                        relative"
                    >
                        {/*Profile Icon */}
                        <div
                            className="w-6 h-6 lg:w-10 lg:h-10 rounded-md 
                            overflow-hidden"
                        >
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <ChevronDownIcon
                            className={`w-4 text-gray-700 fill-black transition 
                            ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
                        />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;