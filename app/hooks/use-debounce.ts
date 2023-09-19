/* */

import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay?: number): T {
    /*Generic function that takes two arguments
    1- value
    2- delay that specifies the debounce dealy in the millisecond
     */
    const [debouncedValue, setDebouncedValue] = useState<T>(value); //state variable

    useEffect(() => {
        //set up side effect that manages the deboncing behavior
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
        /*Effect functtion has timer function. If value changes it will wait for  0.5 sec. If the value
        changes again, the previous timer is canceled and new one starts.
        when the timer completes, it updates the debounced value with the current value */
        return () => {
            //clean up function which is responsible for clearing the time if value changes before timer completes
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}