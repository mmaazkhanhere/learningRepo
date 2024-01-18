/*A custom hook that utilizes useSWR hook to fetch data from the api/movies
endpoint. It provides a convenient way to manage the state of data fetching
in React components by returning the fetched data, any errors, and a loading
indicator */

import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useMovies = () => {

    const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });/*The first part is the URL endpoint. The second part is the function
    responsible for fetching the data. The object passed as the third argument
    contains option for revalidation which means that the data wont 
    automatically revalidate under those conditions */

    return {
        data,// the fetched data
        error,//any error that occurred during the fetch
        isLoading //a boolean indicating whether the data is currently being loaded
    }
};

export default useMovies;