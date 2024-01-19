/*A react component that represents a modal for displaying information about
a movie */

import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
    visible?: boolean; //whether the modal is visible
    onClose: any; //a callback to handle modal closure
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {

    const [isVisible, setIsVisible] = useState<boolean>(!!visible); /*A 
    state varaible to handle the visibility of the modal */

    const { movieId } = useInfoModalStore();/*uses zustand store to retrieve
    the movieId from the InfoModal store */

    const { data = {} } = useMovie(movieId); /*A custom hook to fetch movie
    data based on the movieId using useSWR hook*/

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]); /*Update the visibility state when the visible prop changes */

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]); /*A callback function to handle the closure of the modal. It
    sets the isVisible state to false and delays the execution of the onClose
    callback to allow for a fade-out animation */

    if (!visible) {
        /*If the modal is not visible, null is returned (the component is 
        not rendered) */
        return null;
    }

    return (
        <div
            className="z-50 transition duration-300 bg-black bg-opacity-80 flex 
            justify-center items-center overflow-x-hidden overflow-y-auto fixed 
            inset-0"
        >
            <div
                className="relative w-auto mx-auto max-w-3xl rounded-md 
                overflow-hidden"
            >
                <div
                    className={`${isVisible ? 'scale-100' : 'scale-0'} transform 
                    duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`
                    }
                >

                    <div className="relative h-96">
                        <video
                            poster={data?.thumbnailUrl}
                            autoPlay
                            muted
                            loop
                            src={data?.videoUrl}
                            className="w-full brightness-[60%] object-cover h-full"
                        />
                        <div
                            onClick={handleClose}
                            className="cursor-pointer absolute top-3 right-3 h-10 
                            w-10 rounded-full bg-black bg-opacity-70 flex 
                            items-center justify-center"
                        >
                            <XMarkIcon className="text-white w-6" />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p
                                className="text-white text-3xl md:text-4xl h-full 
                            lg:text-5xl font-bold mb-8"
                            >
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>

                    <div className="px-12 py-8">
                        <div className="flex flex-row items-center gap-2 mb-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">
                                {data?.duration}
                            </p>
                            <p className="text-white text-lg">
                                {data?.genre}
                            </p>
                        </div>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InfoModal;