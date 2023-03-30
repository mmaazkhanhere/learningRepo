import Link from "next/link";
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      {/*className in paranthesis because conditional classes will also be added */}
      <Wrapper>
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="w-[40px] md:w-[60px]" />
        </Link>
        <Menu />
      </Wrapper>
      {/*Whatever written here will be displayed on the screen */}
    </header>
  );
}
