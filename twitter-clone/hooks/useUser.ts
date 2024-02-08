/*A custom hook the encapsulates the logic for fetching and managing data
related to a specific user identified by 'userId' using SWR. It provides
a simple interface for components to access the user's data, error state, 
loading state, and a function to trigger a data re-fetch if needed */

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return {
        data, //the fetched data from the API endpoint
        error, //Any error that occurred during the data fetching process
        isLoading, //a boolean indicating whether the data is currently being loaded
        mutate // a function that can be used to trigger a re-fetch of the data
    }
};

export default useUser;