/*the Favorite Button component is a toggle button that allows users to add or
remove movies from their favorite list. It uses custom hooks for managing user
and favorites data and make async requests to update the data */

import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorites } = useFavorites();/*manages the favorites
    movie */

    const { data: currentUser, mutate } = useCurrentUser();/*get the current 
    user */

    const isFavorite = useMemo(() => {
        /*Checks if the current movie is in the user's list of favorite movies. 
        This avoids unnecessary recalculations during re-renders */

        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        /*The function is triggered when the user clicks the button. It makes an
        async request to server to either add or remove the movie from the
        movie from the user's favorite */
        let response;

        if (isFavorite) {
            /*If the movie is already in favorite list, remove it from the 
            database */
            response = await axios.delete('/api/favorite', { data: { movieId } });
        } else {
            /*If not, add the movie to user favorite list */
            response = await axios.post('/api/favorite', { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds; /*extracts the
        updated list of favorite movie IDs from the response data if available */

        mutate({
            /*mutate is a function provided by SWR for updating the local
            state. It takes an object representing the data to be updated */
            ...currentUser, /*Here, it creates a new object current user with 
            the existing user data*/
            favoriteIds: updatedFavoriteIds, /*updates the favoriteIds field
            with the updatedFavoriteIds */
        });
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? CheckIcon : PlusIcon; /*Renders thge icon based 
    on if the movie is favorite or not */

    return (
        <div
            onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 
            border-white border-2 rounded-full flex justify-center items-center 
            transition hover:border-neutral-300"
        >
            <Icon
                className="text-white group-hover/item:text-neutral-300 
                w-4 lg:w-6"
            />
        </div>
    )
}

export default FavoriteButton;