import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'


export default function ProductDetails() {
  return (
    <div className='w-full md:py-20'>
        <Wrapper>
            <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
                {/*Left Column Start */}
                <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                    <ProductDetailsCarousel/>
                </div>
                {/*Left Column Endd */}

                {/*Right Column Start */}
                <div className='flex-[1] py-3'>
                    {/*Product Title */}
                    <div className='text-[34px] font-semibold mb-2'>
                        Jordan Retro 6 G
                    </div>
                    {/*Product Subtitle */}
                    <div className='text-lg font-semibold mb-5'>
                        Men&apos;s Golf Shoes
                    </div>
                    {/*Product Price */}
                    <div className='text-lg font-semibold'>
                        MRP: $19.50$
                    </div>
                    <div className='text-md font-medium text-black/[0.5]'>
                        incl. of taxes
                    </div>
                    <div className='text-md font-medium text-black/[0.5] mb-20'>
                        {`(Also includes all applicable duties)`}
                    </div>

                    {/*Product Size Range Start */}
                    <div className='mb-10'>
                        {/*Heading Start */}
                        <div className='flex justify-between mb-2'>
                            <div className='text-md font-semibold'>
                                Select Size
                            </div>
                            <div className='text-md font-medium text-black/[0.5] cursor-pointer'>
                                Select Guide
                            </div>
                        </div>
                        {/*Heading End */}

                        {/*Size Start */}
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 6
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 6.5
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 7
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 7.5
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 8
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 8.5
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 9
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                                UK 9.5
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-50 
                            cursor-not-allowed'>
                                UK 10
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-50 
                            cursor-not-allowed'>
                                UK 10.5
                            </div>
                            <div className='border rounded-md text-center py-3 font-medium bg-black/[0.1] opacity-50 
                            cursor-not-allowed'>
                                UK 11
                            </div>
                        </div>
                        {/*Size End */}

                        {/*Show Error Start */}
                        <div className='text-red-600 mt-1'>
                            Size selection is required
                        </div>
                        {/*Show Error End */}
                    </div>
                    {/*Product Size Range End */}

                    {/*Add to Cart */}
                    <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform 
                    active:scale-95 mb-3 hover:opacity-75'>
                    {/*transition transform add a smooth transition effect to any transformation applied to the button
                    active:scale-95 applies scaling transformation to the button when it is in the active (clicked) state */}
                        Add to Cart
                    </button>
                    {/*Add to Cart Button Ends */}

                    {/*Whishlist Button */}
                    <button className='w-full py-4 rounded-full border border-black text-lg 
                    font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 
                    mb-10 hover:opacity-75'>
                        Whishlist
                        <IoMdHeartEmpty size={20}/>
                    </button>
                    {/*Wishlist Button Ends */}

                    {/*Product Details */}
                    <div>
                        <div className='text-lg font-bold mb-5'>
                            Product Details
                        </div>
                        <div className='text-md mb-5'>
                            Feel unbeatable from the tee box to the final putt in a desing that is pure early MJ: speed, class and
                            laden with true early '90s touches like visible air and a transculent rubber sole that continues to stand
                            the test of time. This model fuses the strut of the 1st MJ's championship with some of our best golf technology,
                             helping you make a statement of confidence when it comes time to tame the course
                        </div>
                        <div className='text-md mb-5'>
                            Feel unbeatable from the tee box to the final putt in a desing that is pure early MJ: speed, class and
                            laden with true early '90s touches like visible air and a transculent rubber sole that continues to stand
                            the test of time. This model fuses the strut of the 1st MJ's championship with some of our best golf technology,
                             helping you make a statement of confidence when it comes time to tame the course
                        </div>
                    </div>
                    {/*Product Details End */}
                </div>
                {/*Right Column Ends */}
            </div>

            <RelatedProducts />

        </Wrapper>
    </div>
  )
}
