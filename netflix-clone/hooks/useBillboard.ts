/*This custom hook is used to fetch data from random api endpoint  using a 
specified fetcher function and reactively update the UI based on the fetched
data, errors, or loading state*/

import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useBillboard = () => {
    const { data, error, isLoading } = useSwr('/api/random', fetcher, {
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

export default useBillboard;