import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '@/utils/api'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const maxResult=3

export default function Category({ category, products, slug }) {

    const [pageIndex, setPageIndex] = useState(1); //initialise the state varibale pageIndex to 1 using useState hook
    const { query } = useRouter(); //use useRouter hook to get the current URL query and destructures the 'query' parameter from it

    useEffect(() => {
        setPageIndex(1);
    }, [query]); //the useEffect hook is used to set the pageIndex varibale to 1 whenever there is a change in the query object, which ensures that the page index is reset to 0 whenever the query changes

    const { data, error, isLoading } = useSWR(
        `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        fetchDataFromApi,
        {
            fallbackData: products,
        }
    ); /*useSWR hook is used to fetch data from an API endpoint and includes query parameters like 'populate' 'filter' and 'pagination' that are used tp filter and paginate data
    *- the slug variable is used to fetch data from API endpoint
     - maxResult varibale is used to limit the number of results returned from API
     - the 'data' 'error' and 'isLoading' varibales are destructured from the return value of the 'useSWR' hook. 
     - the data varibale contains the fetched data
     - the error variable contains any error encountered during the fetch
     - isLoading variable is a boolean that indicates whether data is currently being fetch from API */


  return (
    <div className='w-full md:py-20 relative'>
        <Wrapper> 
            <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                    {category?.data?.[0]?.attributes?.name}
                </div>
            </div>

            {/*Product grid start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                {data?.data?.map((product) => (
                    <ProductCard key={product?.id} data={product} />
                ))}
            </div>
            {/*Product grid end */}

            {/* PAGINATION BUTTONS START */}
            {data?.meta?.pagination?.total > maxResult && (
                    <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={pageIndex === 1} //disbaled if the current page is the first page
                            onClick={() => setPageIndex(pageIndex - 1)} // on clicking it moves to the previous page
                        >
                            Previous
                        </button>

                        <span className="font-bold">{`${pageIndex} of ${
                            data && data.meta.pagination.pageCount //shows the current page number and total page  number
                        }`}</span>

                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={
                                pageIndex ===
                                (data && data.meta.pagination.pageCount)
                            } //the button is disabled if the current page is last page
                            onClick={() => setPageIndex(pageIndex + 1)} //on clicking moves to the next page
                        >
                            Next
                        </button>
                    </div>
                )}
                {/*This code renders a pagination component based on the 'data' recieved from an API call. It first check if ;'data' exists. If it does, it checks whether the total number
                of itms in the response is greater than the maxResult value. If it is, it renders a 'div' element containing two buttons and a span element
                - The 'data' is assumed to have a 'meta' property, which is assumed to have a 'pagination' property, which is an object containing properties like 'pageCount', 'total' 
                and pageSize which are used to calculate the pagination
                */}

                {/* PAGINATION BUTTONS END */}

                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                        <img src="/logo.svg" width={150} />
                        <span className="text-2xl font-medium">Loading...</span>
                    </div>
                    /*Render a loading spinner or message when isLoading is true. It renders an image and a text message indicating that the content is loading which is the logo of the 
                    store. The && operator is used to conditionally render the loading spinner when  isLoading is true, which helps avoid unnecessary rendering of the loading spinner */
                )}
        </Wrapper>
    </div>
  )
}

export async function getStaticPaths() {
    const category = await fetchDataFromApi("/api/categories?populate=*");
    const paths = category?.data?.map((c) => ({
        params: {
            slug: c.attributes.slug,
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

// `getStaticPaths` requires using `getStaticProps`
    export async function getStaticProps({ params: { slug } }) {
        const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`
        );
        const products = await fetchDataFromApi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&
        /api/products?populate=*&[filters][categories][slug][$eq]=sneakers&pagination[page1]=1&pagination[pageSize]=${maxResult}`);

        return {
            props: {
                category,
                products,
                slug,
            },
    };
}
/*getStaticProps is used in Nextjs to fetch data at build time and pass it as props to a page component
- fetchDataFromApi is called twice. The first call to API uses the slug value to fetch a single category object the mathces the slug value
- Second call to it uses the 'slug' value to fethc an array of products that belong top the category with the value slug
- Three properties are returned: categories, products, and slug */