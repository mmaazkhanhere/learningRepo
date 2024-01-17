/*This hook leverages the SWR library to handle data fetching for the current
user and provides a simple interface for components to access the current
user's data, error, loading state, and a function to trigger a refetch if needed
*/

//With it, we wont need Redux or any other state management system

import useSwr from 'swr'

import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
    /*SWR hook is used to perform data fetching and takes two parameters,
    1) the key which represents the URL to fetch data from
    2) the fetcher function which is responsible for making the actual HTTP
    GET request.
    The return value of useSWR includes data, error, isLoading and mutate,
    which are destructured.
    */
    return {
        data,
        error,
        isLoading,
        mutate,
    }
    /*The hook returns an object containing the following properties
    - the fetched data from the endpoint
    - an error object that might occur during the fetching process
    - a boolean indicating whether the data is still being fetched
    - a mutate function that can be used to tiggeer a re-fetch of the data
    */
};

export default useCurrentUser;