/*This custom hook encapsulates the logic for fetching and managing data
related to the current user using SWR. It provides a simple interface for
components to access the current user's data, error state, loading state,
and a function to trigger a data refetch if needed*/

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return {
        data, //the fetched data from the API endpoint
        error, //any error that occurred during the fetching process
        isLoading, //a boolean indicating whether the data is currently being fetched
        mutate // function that can be used to trigger a re-fetch of the data
    }
};

export default useCurrentUser;