import Wrapper from '@/components/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartItem from '@/components/CartItem'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'


export default function Cart() {

    const {cartItems} =useSelector((state)=>state.cart)

    const subTotal=useMemo(()=>{ /*useMemo takes two arguments" a function that returns a value and an array of dependencies. The function will be only re-executed when one of the
     dependencies changes*/

        return cartItems.reduce((total,val)=>total+val.attributes.price,0) /*second argument is the intial value of the total which is set to '0'. The useMemo hook returns a calculated
        subtotal value, which will be only re-calculated if the cartItems array changes*/

    },[cartItems]) /*uses the 'useMemo' hook to calculates the subtotal value by using reduce method on the 'cartItems' array, which iterates over each item in the array
    and returns a single value, which is the sum of all items prices*/

  return (
    <div className='w-full md:py-20'>
        <Wrapper>

            {cartItems.length>0 && ( //carItems array is first checked to see if it has any items using the length property. If there are items in the array, the cart content is rendered
                <>
                    {/*Heading and Paragraph */}
                    <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                        <div className='text-[28px] md:text-[34px] font-semibold mb-5 leading-tight'>
                            Shopping Cart
                        </div>
                    </div>
                    {/*Heading and paragraph ends */}

                    {/*Cart content start */}
                    <div className='flex flex-col lg:flex-row gap-12 py-10'>
                        {/*Cart items start */}
                        <div className='flex-[2]'>
                            <div className='text-lg font-bold'>Cart Items</div>

                            {cartItems.map((item)=>(
                                <CartItem key={item.id} data={item}/>
                            ))} {/*Thois code displays the content of a shopping cart in which a map method is used to create a new 'cartItem' component for each item in the 
                            'cartItems' array, using the 'key' prop to set a unique identifier for each component and the 'data' prop to pass the item data to the component */}

                        </div>
                        {/*Cart items end */}

                        {/*CArt summary */}
                        <div className='flex-[1]'>
                            <div className='text-lg font-bold'>Summary</div>
                            <div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
                                <div className='flex justify-between'>
                                    {/*Subtotal */}
                                    <div className='uppercase text-md md:text-lg font-medium text-black'>
                                        Subtotal
                                    </div>
                                    {/*Price */}
                                    <div className='text-md md:text-lg font-medium text-black'>
                                       $ {subTotal}
                                    </div>
                                </div>

                                {/*Message Section */}
                                <div className='text-sm md:text-md py-5 border-t mt-5'>
                                    The subtotal reflects the totla price of your order, including duties and taxes, before any 
                                    applicable discounts. It doesnt include delievery costs and international transaction fees.
                                </div>
                            </div>

                            {/*button Start */}
                            <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform
                            active:scale-95 mb-3 hover:opacity-75'>
                                Checkout
                            </button>
                        </div>
                        {/*Cart summary end */}
                    </div>
                    {/*Cart content end */}
                </>
            )}
            

            {/* Empty Cart Message */}

            {cartItems.length<1 &&  //checks if there are any cartItems. If the shopping cart is empty, the following code is rendered displaying an empty cart message
                <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
                    <Image 
                    src='/empty-cart.jpg' 
                    width={300} 
                    height={300} 
                    alt='' 
                    className='w-[300px] md:w-[400px]' />
                    <span className='text-xl font-bold'>
                        Your cart is empty
                    </span>
                    <span className='text-xl font-bold' >
                        Looks like you have not added anything in your cart
                    </span>
                    <br/>
                    <span className='text-center mt-4'>
                        Go ahead and explore top categories
                    </span>

                    <Link 
                    href='/'
                    className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform
                    active:scale-95 mb-3 hover:opacity-75 mt-8'>
                        Continue Shopping
                    </Link>
                </div>
            }
            </Wrapper>
        </div>
  )
}
