/*A watch page where users can view a specific with an embedded video player
and a navigation bar. The movie data is fetched dynamically based on the movie
ID from the router query */

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {

    const router = useRouter();//for navigation

    const { movieId } = router.query;/*Extract the movieId from the router query
    parameters */

    const { data } = useMovie(movieId as string); /*Uses the useMovie hook to
    fetch movie data based on the extracted movieId */

    return (
        <div className="h-screen w-screen bg-black">
            {/*Navbar containing back arrow for going to home page and title
            of the movie */}
            <nav
                className="fixed w-full p-4 z-10 flex flex-row items-center gap-8
                bg-black bg-opacity-70"
            >
                <ArrowLeftIcon
                    onClick={() => router.push('/')}
                    className="w-4 md:w-10 text-white cursor-pointer 
                    hover:opacity-80 transition"
                />
                {/*Title of the movie watching */}
                <p
                    className="text-white text-1xl md:text-3xl font-bold"
                >
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>
            {/*Video */}
            <video
                className="h-full w-full"
                autoPlay
                controls
                src={data?.videoUrl}>

            </video>
        </div>
    )
}

export default Watch;