/*Custom React Hook that fetches notifications for a specified user Id. */

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useNotifications = (userId?: string) => {

    const url = userId ? `/api/notifications/${userId}` : null;/*Constructs the
    URL based on provided userId. If a userId is provided, the URL is set to
    `api/notifications/userId` indicating the end point to fetch notifications
    for a specific user. If no user id is provided, the URL is set to null */

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, // notification data
        error, // any error that may occurred during the fetching process
        isLoading, // indicates whether the data is still being fetched
        mutate // function to manually refetch data
    }
};

export default useNotifications;