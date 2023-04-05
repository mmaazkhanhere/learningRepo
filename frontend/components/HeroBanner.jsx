/* eslint-disable @next/next/no-img-element */
import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

export default function HeroBanner() {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center 
            justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )} /* a custom function to render the 'previous' arrow button for the Carousel and takes two arguments (1)'clickHandler' is a function that can be called to trigger
        the previous slide (2)'hasPrev' is a boolean value indicating whether there is a previous slide to display. The function returns a react component that represent a 
        previous arrow button. When the button is clicked, it triggers the 'clickHandler' function to go to the previous slides*/
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center 
            cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg rotate-180" />
          </div>
        )}
      >
        <div>
          <img
            src="/slide-1.png"
            alt=""
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
            text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Shop Now
          </div>
        </div>
        <div>
          <img
            src="/slide-2.png"
            alt=""
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
            text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Shop Now
          </div>
        </div>
        <div>
          <img
            src="/slide-3.png"
            alt=""
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
            text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Shop Now
          </div>
        </div>
      </Carousel>
    </div>
  );
}
