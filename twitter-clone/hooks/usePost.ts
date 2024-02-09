/*This hook provides a convenient way to fetch a single post from the server
by its Id. It handles the data fetching process, loading state, and error 
handling */

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePost = (postId: string) => {
    const { data, error, isLoading, mutate } =
        useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

    return {
        data, //contains the single post
        error, //contains any error that occurred during the fetch process
        isLoading, //indicates whether the data is currently being fetched
        mutate //function to manually re-fetch the data
    }
};

export default usePost;
