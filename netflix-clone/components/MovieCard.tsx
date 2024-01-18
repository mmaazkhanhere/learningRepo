/*The movie card component represents a card for displaying movie information. 
It includes an image, icons for play and favorite actions, and the ability
to open an information modal. The card has a hover effect revealing
additional details */

import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface MovieCardProps {
    data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {

    const router = useRouter();/*To access Nextjs router to navigate through
    the app */
    const { openModal } = useInfoModalStore(); /*hook to obtain the openModal
    function */

    const redirectToWatch = useCallback(() =>
        router.push(`/watch/${data.id}`), [router, data.id]); /*A memoized
        callback function is created using useCallback that redirects to the
        "/watch" route with the movie's id as a parameter */

    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            {/*Poster image of the movie */}
            <img
                onClick={redirectToWatch} //when clicked on starts the movie
                src={data.thumbnailUrl}
                alt="Movie"
                draggable={false}
                className="cursor-pointer object-cover transition duration-300 
                shadow-xl rounded-md group-hover:opacity-90 
                sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
            />
            {/*Image displayed when hovered over */}
            <div
                className="opacity-0 absolute top-0 transition duration-200 z-10
                invisible sm:visible delay-300 w-full scale-0
                group-hover:scale-110 group-hover:-translate-y-[6vw]
                group-hover:translate-x-[2vw]   group-hover:opacity-100"
            >
                <img
                    onClick={redirectToWatch}
                    src={data.thumbnailUrl}
                    alt="Movie"
                    draggable={false}
                    className=" cursor-pointer object-cover transition
                    duration shadow-xl rounded-t-md w-full h-[12vw] "
                />
                <div
                    className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full
                    transition shadow-md rounded-b-md"
                >
                    {/*Additional information displayed when hovering over */}
                    <div className="flex flex-row items-center gap-3">
                        <div
                            onClick={redirectToWatch}
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 
                            bg-white rounded-full flex justify-center items-center 
                            transition hover:bg-neutral-300"
                        >
                            {/*Play component called */}
                            <PlayIcon className="text-black w-4 lg:w-6" />
                        </div>
                        <FavoriteButton movieId={data.id} />
                        <div
                            onClick={() => (data?.id)}
                            className="cursor-pointer ml-auto group/item w-6 h-6 
                            lg:w-10 lg:h-10 border-white border-2 rounded-full 
                            flex justify-center items-center transition 
                            hover:border-neutral-300"
                        >
                            <ChevronDownIcon
                                className="text-white 
                                group-hover/item:text-neutral-300 w-4 lg:w-6"
                            />
                        </div>
                    </div>
                    {/*Released date */}
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    {/*Duration of movie */}
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data.duration}
                        </p>
                    </div>
                    {/*Genre of the movie */}
                    <div
                        className="flex flex-row items-center gap-2 mt-4 text-[8px] 
                        text-white lg:text-sm"
                    >
                        <p>{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;