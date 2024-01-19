/*A react component for button, which when clicked, navigates to the specified
movie's watch page using the Next.js router. The styling is done using 
TailwindCSS classes for a clean and responsive design */

import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

    const router = useRouter();//for navigation

    return (
        <button
            onClick={() => router.push(`/watch/${movieId}`)} /*when clicked
            navigates to watching the movie */
            className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4
            w-auto text-xs lg:text-lg font-semibold flex flex-row
            items-center hover:bg-neutral-300 transition"
        >
            <PlayIcon className="w-4 md:w-7 text-black mr-1" />
            Play
        </button>
    );
}

export default PlayButton;