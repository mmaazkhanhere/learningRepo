/*this SearchInput component creates a search input field that allows users to search for items
 based on criteria specified in the URL's query parameters. It debounces user input to prevent 
 excessive API calls and updates the URL as the user types or modifies search criteria. */

"use client"

import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/hooks/use-debounce';
import qs from "query-string"

const SearchInput = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");//search the url for parameter categoryId
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || ""); //state variable
    const debouncedValue = useDebounce<string>(value, 500); /*custom hook that represents the debounced
    version of the search input value which help reduce unnecessary API calls when the user is typing */

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value); //handle the event of change when user is typing in input element
    }

    useEffect(() => {
        //useEffect hook to watch changes in the debounced value, cateogry id, and router

        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };
        //when debouncedValue or category id changes, the code constructs a new query object with search criteria

        const url = qs.stringifyUrl({
            //uses sq to serialise the query object into a URL query string
            url: window.location.href,
            query,
        }, { skipEmptyString: true, skipNull: true });
        router.push(url); //navigates to the new url effectively updating the search parameter
    }, [debouncedValue, router, categoryId])

    return (
        <div className='relative'>
            <Search className='absolute h-4 w-4 top-3
            left-4 text-muted-foreground' /> {/*Search Icon */}
            <Input
                onChange={onChange}
                value={value}
                placeholder='Search...'
                className='pl-10 bg-primary/10'
            /> {/*Shadcn Ui component */}
        </div>
    )
}

export default SearchInput