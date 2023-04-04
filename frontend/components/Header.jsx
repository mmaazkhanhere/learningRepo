import Link from "next/link";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px] ");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  }; //functionality that will disappear the navbar when scroll down below 200px but whenever it is scroll up, the navbar will be displayed. Also we dont want this to happen
  //when mobile menu enabled

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      {/*className in paranthesis because conditional classes will also be added
      sticky top-0 will cause the header element to be positioned at the top of the viewport until the user scrolls past it, after which it will scroll normally with the rest of the
      page content */}

      <Wrapper className="h-[60px] flex justify-between items-center">
        {/*Logo Included */}
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="w-[40px] md:w-[60px]" />
        </Link>{" "}
        {/*We will go to home screen whenever the logo is clicked upon */}
        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />
        {/*Mobile Menu */}
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}
        {/*Whenever the mobileMenu will be true the Menu will be displayed. Otherwise it wont be.  */}
        {/*Icons displayed */}
        <div className="flex items-center gap-2 text-black">
          {" "}
          {/*Icon Start */}
          <div className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[14px] md:text-[20px]" />
            <div
              className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex 
            justify-center items-center px-[2px] md:px-[5px]"
            >
              58
            </div>
          </div>
          {/*Icon end */}
          {/*Icon Start */}
          <div className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex jsutify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <BsCart className="text-[19px] md:text-[24px]" />
            <div
              className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex 
              justify-center items-center px-[2px] md:px-[5px]"
            >
              5
            </div>
          </div>
          {/*Icon end */}
          {/*Mobile Icon Start */}
          <div className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/*Mobile Icon end */}
        </div>
      </Wrapper>

      {/*Whatever written here will be displayed on the screen */}
    </header>
  );
}
