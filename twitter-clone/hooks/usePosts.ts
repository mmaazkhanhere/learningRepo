/*This hook provides a convenient way to fetch posts from the server, optionally
filtering them by user id. It handles the data fetching process, loading 
state, and error handling transparently*/

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'; /*API
    endpoint. If user id exists, it constructs url with userId query parameter
    otherwise simple api post */

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, //contains the fetched posts
        error, //errors that may have occurred during fetching
        isLoading, //indicates whether the data is currently being fetched
        mutate //function to manually refetch the data
    }
};

export default usePosts;