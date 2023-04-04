import React from "react";
import Wrapper from "./Wrapper";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper className="flex flex-col justify-between md:flex-row gap-[50px] md:gap-0">
        {/*Left Start */}
        <div className="flex flex-col md:flex-row gap-[50px] md:gap-[75px] lg:gap-[100px]">
          {/*Menu Start */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Find a store
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Become a partner
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              sign up for email
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              send us feedback
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              student discount
            </div>
          </div>
          {/*Menu End */}

          {/*Normal Menu Start */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/*Menu Start */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                get help
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Order Status
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Delievery
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Returns
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Payment Options
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Contact Us
              </div>
            </div>
            {/*Menu Ends */}

            {/*Menu Start */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                about nike
              </div>
              <div className="font-oswald font-medium uppercase text-sm">
                News
              </div>
              <div className="font-oswald font-medium uppercase text-sm">
                Careers
              </div>
              <div className="font-oswald font-medium uppercase text-sm">
                Investors
              </div>
              <div className="font-oswald font-medium uppercase text-sm">
                Sustainability
              </div>
            </div>
            {/*Menu end */}
          </div>
          {/*Normal Menu End */}
        </div>
        {/*Left End */}

        {/*Right Start */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href="https://www.facebook.com/nike/" target="_blank">
            <div className="w-10 h-10 flex justify-center items-center bg-white/[0.25] rounded-full hover:bg-white/[0.5]">
              <FaFacebookF size={20} />
            </div>
          </Link>
          <Link href="https://twitter.com/Nike" target="_blank">
            <div className="w-10 h-10 flex justify-center items-center bg-white/[0.25] rounded-full hover:bg-white/[0.5]">
              <FaTwitter size={20} />
            </div>
          </Link>
          <Link href="https://www.youtube.com/user/NIKE" target="_blank">
            <div className="w-10 h-10 flex justify-center items-center bg-white/[0.25] rounded-full hover:bg-white/[0.5]">
              <FaYoutube size={20} />
            </div>
          </Link>
          <Link href="https://www.instagram.com/nike/?hl=en" target="_blank">
            <div className="w-10 h-10 flex justify-center items-center bg-white/[0.25] rounded-full hover:bg-white/[0.5]">
              <FaInstagram size={20} />
            </div>
          </Link>
        </div>
        {/*Right End */}
      </Wrapper>

      <Wrapper className="flex justify-between flex-col md:flex-row gap-[10px] md:gap-0 mt-10">
        {/*Left Start */}
        <div className="text-[12px] text-white/[0.5] hover:text-white text-center md:text-left">
          @2023 Nike, Inc. All Rights Reserved
        </div>
        {/*Left End */}

        {/*Right Start */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/*Right End */}
      </Wrapper>
    </footer>
  );
}
