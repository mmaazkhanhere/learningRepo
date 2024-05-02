/*custom hook to debounce the value provided to it. It effectively delays updating
the debouncedValue until the specified dealy has passed since the last update 
to the value */

import { useEffect, useState } from "react";


/*T is the type of the value being debounced. Value is the current value to be
debounced. Delay is the delay duration */

export function useDebounce<T>(value: T, delay?: number): T {

    const [debouncedValue, setDebouncedValue] = useState<T>(value);/*state variable 
    that holds the debounced value */

    /*This hook is used to set up a side effect that runs whenever the value
    or delay changes. */
    useEffect(() => {
        /*setTimeout function is called which schedules the update of the
        debouncedValue after the specified delay. If the delay argument is not
        provided, it defaults to 500 */
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        /*cleanup function that clears the timeout using clearTimeout to avoid
        memory leaks */
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debouncedValue;
}