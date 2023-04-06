import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartItem() {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/*Image Start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="product-1.webp" alt="product" />
      </div>
      {/*Image end */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/*Product title */}
          <div className="flex flex-col md:flex-row font-semibold text-black/[0.8]">
            Jordan Retro 6 G
          </div>

          {/*Product subtitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Men&apos;s Golf Shoes
          </div>

          {/*Product price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP: $19.69
          </div>
        </div>
        {/*Product subtitle */}
        <div className="md:text-md font-medium text-black/[0.5] hidden md:block">
          Men&apos;s Golf Shoes
        </div>

        <div className="flex items-center justify-between mt-4 ">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            {/*size slection starts */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select name="" id="" className="hover:text-black">
                <option value="1">UK 6</option>
                <option value="2">UK 6.5</option>
                <option value="3">UK 7</option>
                <option value="4">UK 7.5</option>
                <option value="5">UK 8</option>
                <option value="6">UK 8.5</option>
                <option value="7">UK 9</option>
                <option value="8">UK 9.5</option>
                <option value="8">UK 10</option>
                <option value="8">UK 10.5</option>
                <option value="8">UK 11</option>
              </select>
            </div>
            {/*size selection ends */}

            {/*quantity selection */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Qunatity:</div>
              <select name="" id="" className="hover:text-black">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
                <option value="1">7</option>
                <option value="1">8</option>
                <option value="1">9</option>
                <option value="1">10</option>
              </select>
            </div>
            {/*quantity seleciton ends */}
          </div>

          {/*Delete icon */}
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  );
}
