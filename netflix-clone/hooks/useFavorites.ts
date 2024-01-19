/*this hook is used to fetch favorite movies from the database through the 
mentioned api endpoint */

import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useMovies = () => {

    const { data, error, isLoading, mutate } = useSwr('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });/*use useSwr hook to fetch data from the mentioned api endpoint without
    any revalidation */

    return {
        data, //the fetched data from the endpoint
        error, //any error that occurred during the data fetching process
        isLoading, //a boolean indicating whether tje data still being fetched
        mutate //a function that allows manual triggering of a refetch
    }
};

export default useMovies;