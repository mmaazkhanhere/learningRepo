import { updateCart, removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux"; //redux is used to maintain and update data across your applications for mulptiple components to share, all while remaining independet of the conponents

export default function CartItem({ data }) {
  const p = data.attributes;
  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    /*the funciton takes two parameters 'e' is the event object generated by the input field and 'key' is a string representing the property of the 
  cart item that is being update for example quantity*/

    let payload = {
      /*A payload object is created containing the new valye of the property 'val', the 'id' of the cart item being updated, and the name of the property being updated */
      key,
      val:
        key === "quantity"
          ? parseInt(e.target.value)
          : e.target
              .value /*If the property is qyantity, the value is parsed as an integer using 'parseInt' */,
      id: data.id,
    };

    dispatch(updateCart(payload)); //the updateCart is dispatched to the Redux store with the payload object as an argument
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/*Image Start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          height={120}
          width={120}
        />
      </div>
      {/*Image end */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/*Product title */}
          <div className="flex flex-col md:flex-row font-semibold text-black/[0.8]">
            {p.name}
          </div>

          {/*Product subtitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p.subtitles}
          </div>

          {/*Product price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            $ {p.price}
          </div>
        </div>
        {/*Product subtitle */}
        <div className="md:text-md font-medium text-black/[0.5] hidden md:block">
          {p.subtitles}
        </div>

        <div className="flex items-center justify-between mt-4 ">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            {/*size slection starts */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select //creates a dropdown/select element with options for selecting the size of a product
                name=""
                id=""
                className="hover:text-black"
                onChange={(e) =>
                  updateCartItem(e, "selectedSize")
                } /*select element listen for the 'onChange' event and triggers the 'updateCartItem' function with two arguments:
                1- the event object 2- the string 'selectedSize' to indicate the selected size to ne updated */
              >
                {p.size.data.map((item, i) => {
                  /* a mapping function is used to generate the 'options' element based on the 'size' data of the product. For each 'item' in the 'size.data' 
                array, a new 'option' element is generated with the  following properties*/
                  return (
                    <option
                      key={i} // set to the index of the current item in the array
                      value={item.size} //set to the size value of the current item
                      disabled={!item.enabled ? true : false} //disabled is set to true of the current item is not enabled otherwise set to false
                      selected={data.selectedSize === item.size} //selected is set to true if the selected size value matches the size value of the current tiem otherwise set to false
                    >
                      {item.size} {/*size value of the current item */}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*size selection ends */}

            {/*quantity selection */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Qunatity:</div>
              <select
                name=""
                id=""
                className="hover:text-black"
                onChange={(e) =>
                  updateCartItem(e, "quantity")
                } /*an onChange event listener is added to the select element, which calls the updateCartItem function and passes the event object
                and a akey argument of quantity, which tells the function to update the quantity value in the 'data' object with the selected value from dropdown*/
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  /*am array of 10 elements, each representing a quantity is created. The  map funciton is used to iterate over each
                element in the array, and for each element a 'kry' and 'value' are generated for the corresponding o[tion element in the select dropdown*/
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*quantity seleciton ends */}
          </div>

          {/*Delete icon */}
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px]
           md:text-[20px]"
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
          />
        </div>
      </div>
    </div>
  );
}
