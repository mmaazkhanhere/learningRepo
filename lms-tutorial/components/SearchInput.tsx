/*Search input component is responsible for rendering a search input field where
users can type to search for courses */

"use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from "query-string"

type Props = {}

const SearchInput = (props: Props) => {

    const [value, setValue] = useState(""); //current value of the search input field

    const debouncedValue = useDebounce(value); /*the debounced value of the search
    input field using debounced hook */

    /*debouncing is a technique used to improve performance and reduce unnecessary
    resource consumption. In term of search bars, it prevents excessive API
    request and delays the execution of such operation until a specified period
    of inactivity */

    const searchParams = useSearchParams();//hook to access and get query paramters
    const router = useRouter(); //router object for navigation
    const pathname = usePathname(); //hook to get url pathname

    const currentCategoryId = searchParams.get("categoryId"); //get the category id

    /*A use effect that constructions a new URL with updated query parameters,
    including debounced search input values, using the qs.stringifyUrl and navigate
    to that url using router */
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        })

        router.push(url);
    }, [currentCategoryId, debouncedValue, pathname, router]);

    return (
        <div
            className='relative'
        >
            <Search
                className='h-4 w-4 absolute top-3 left-3 text-slate-600'
            />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 
                focus-visible:ring-slate-200'
                placeholder='Search for a course'
            />
        </div>
    )
}

export default SearchInput