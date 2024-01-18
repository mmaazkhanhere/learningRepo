/*A grid-based list of movie cards. It checks if there is data to display and
if so, renders a title and a grid of movie cards using the MovieCard component */

import React from 'react';

import { MovieInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
    data: MovieInterface[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {

    if (isEmpty(data)) {
        /*If the data prop is empty, the component returns null meaning that the
        component will not be rendered */
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                {/*The title of the movie */}
                <p
                    className="text-white text-md md:text-xl lg:text-2xl 
                    font-semibold mb-4"
                >
                    {title}
                </p>
                {/*For the corresponding movie title, related movie detail */}
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie) => (
                        //mapping over the data of the movie
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieList;