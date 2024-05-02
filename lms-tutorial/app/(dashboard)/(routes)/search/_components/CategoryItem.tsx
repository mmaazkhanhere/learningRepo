/*A react component that represents a reusable clickable button for representing
category */

"use client"

import { cn } from '@/lib/utils';
import React from 'react'
import { IconType } from 'react-icons';
import qs from "query-string"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
    label: string;
    value?: string;
    icon?: IconType
}

const CategoryItem = ({ label, value, icon: Icon }: Props) => {

    const pathname = usePathname();//hook to get the url pathname
    const router = useRouter(); //router object for navigation
    const searchParams = useSearchParams();// hook to get the query params

    const currentCategoryId = searchParams.get("categoryId"); /*search the url for
    query parameter categoryId */

    const currentTitle = searchParams.get("title");//get the title query parameter

    const isSelected = currentCategoryId === value; /*Determines whether the
    category represented by this item is currently selected */

    /*A function that is called when the button is clicked. I constructs a new url
    with updated query parameters using the qs.stringifyUrl function. If the category
    is currently selected, the categoryId parameter is set to null to deselect the
    category otherwise the category is set to valye */
    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        })
        router.push(url);
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
        >
            {
                Icon && <Icon size={20} />
            }
            <div className='truncate'>
                {label}
            </div>
        </button>
    )
}

export default CategoryItem