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
        <Menu />
      </Wrapper>

      {/*Whatever written here will be displayed on the screen */}
    </header>
  );
}
