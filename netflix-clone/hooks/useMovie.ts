/*The hook is designed to fetch movie data based on an optional id parameter
using useSWR library to handle data caching, revalidation, and loading
state. It provides an easy-to-use interface for components to retrieve
movie information from the specified API endpoint */

import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useMovie = (id?: string) => {
    const { data, error, isLoading } =
        useSwr(id ? `/api/movies/${id}` : null, fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });
    return {
        data,
        error,
        isLoading
    }
};

export default useMovie;