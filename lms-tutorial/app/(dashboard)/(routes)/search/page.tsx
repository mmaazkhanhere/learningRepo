/*A page for searching and displaying courses */

import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories';
import SearchInput from '@/components/SearchInput';
import { getCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import CoursesList from '@/components/CoursesList';

type Props = {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ({ searchParams }: Props) => {


    const { userId } = auth(); //get the id of the current sign in user

    if (!userId) {
        //if no signed in user, redirect to to home page
        return redirect("/")
    }

    //get all the categories 
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({ userId, ...searchParams })

    return (
        <>
            <div className='px-6 pt-6 md:hidden md:mb-0 block'>
                <SearchInput />

            </div>
            <div
                className='p-6 space-y-4'
            >
                <Categories
                    items={categories}
                />

                <CoursesList
                    items={courses}
                />
            </div>
        </>

    )
}

export default SearchPage