import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { addToCart } from '@/store/cartSlice'
import { fetchDataFromApi } from '@/utils/api'
import { getDiscountedPricePercentage } from '@/utils/helper'
import React, { useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export default function ProductDetails({product, products}) {

    const p=product?.data?.[0]?.attributes;
    const[selectedSize,setSelectedSize]=useState()
    const[showError,setShowError]=useState(false)
    const dispatch = useDispatch()
    const notify =()=>{
        toast.success('Success. Item added to cart!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

  return (
    <div className='w-full md:py-20'>
        <ToastContainer />
        <Wrapper>
            <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
                {/*Left Column Start */}
                <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                    <ProductDetailsCarousel images={p.image.data}/>
                </div>
                {/*Left Column Endd */}

                {/*Right Column Start */}
                <div className='flex-[1] py-3'>
                    {/*Product Title */}
                    <div className='text-[34px] font-semibold mb-2 leading-tight'>
                        {p.name}
                    </div>
                    {/*Product Subtitle */}
                    <div className='text-lg font-semibold mb-5'>
                        {p.subtitle}
                    </div>
                    {/*Product Price */}
                    <div className='flex items-center'>
                        <p className='mr-2 text-lg font-semibold'>
                            $ {p.price}
                        </p>
                        {p.original_price &&(
                            <>
                            <p className='text-base font-medium line-through'>
                                $ {p.original_price}
                            </p>
                            <p className='ml-auto text-base font-medium text-green-500'>        
                                {getDiscountedPricePercentage(
                                    p.original_price,
                                    p.price
                                )}
                                % off
                            </p>
                            </>
                        )
                        }
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
                        <div id='sizeGrid' className='grid grid-cols-3 gap-2'>

                            {p.size.data.map((item,i)=>(
                                <div key={i} className={`border rounded-md text-center py-3 font-medium 
                                ${item.enabled ? 'hover:border-black cursor-pointer':'cursor-not-allowed opacity-50 bg-black/[0.1]'}
                                ${selectedSize === item.size ? "border-black" : ""}`} //if a size is selected, a black border will be displayed around it
                                onClick={()=>{
                                    setSelectedSize(item.size)
                                    setShowError(false) 
                                }}>
                                    {item.size}
                                </div>
                            ))}
                            
                        </div>
                        {/*Size End */}

                        {/*Show Error Start */}
                        {showError && <div className='text-red-600 mt-1'> 
                            Size selection is required
                        </div>} 
                        {/*showError if no size is selected and add to cart is clicked on */}
                        {/*Show Error End */}
                    </div>
                    {/*Product Size Range End */}

                    {/*Add to Cart */}
                    <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform 
                    active:scale-95 mb-3 hover:opacity-75'
                    onClick={()=>{
                        if(!selectedSize) {
                            setShowError(true)
                            document.getElementById("sizeGrid").scrollIntoView({
                                block:'center',
                                behavior:"smooth"
                            })
                        }
                        else{
                            dispatch(addToCart({
                                ...product?.data?.[0],
                                selectedSize,
                                oneQuantityPrice:p.price
                            }));
                            notify();
                        }
                    }}>
                    {/*transition transform add a smooth transition effect to any transformation applied to the button
                    active:scale-95 applies scaling transformation to the button when it is in the active (clicked) state */}

                    {/*The 'onClick' prop sets the event handler function that is executed when the button is clicked. The function checks whether
                    size is selected or not. If no size is selected, the function sets the variable showError to true and scrolls the element with
                    an id 'sizeGrid' (which is used be main div so size selection) into view using the 'scrollIntoView' method.
                    - The block center option specifies that the element should be vertically centered within its container
                    - The behavior smotth option specifies that the scrolling should be animated smoothly */}
                    
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

                        <div className='markdown text-md mb-5'>
                            <ReactMarkdown>
                                {p.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                    {/*Product Details End */}
                </div>
                {/*Right Column Ends */}
            </div>

            <RelatedProducts  products={products}/>

        </Wrapper>
    </div>
  )
}

export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
    /*getStaticPaths is typically used in Nextjs to generate a list of valid paths for dynamic pages at build time
    - fetchDataFromApi is called to retrieve data from an API endpoint that returns a list of categories with attributes and wati while the fetching is complete
    - The return data is stored in the cateogry variable
    - The optional chaining operator (?.) is used to safely access the data property of the category object. If category is 'undefined' or 'null', the
    value of the paths will be 'undefined'
    - The 'map' function is called on the 'category.data' array to transform each category  object into an objects with a params property 
    that contain a slug property. This creates an array of objects that can be used as the 'paths' parameter for the 'getStaticProps' function.
    - The 'fallback' property is set to 'false', which means that any request for a path that is not in the 'paths' array will result a 404 error */
}

export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(`/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);

    return {
        props: {
            product,
            products
        },
};
}
