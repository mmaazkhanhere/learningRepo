import React from 'react';

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

/* This line of code is defining a functional component called `Input` that takes
in the `InputProps` interface as its props. The props include `id`, `onChange`,
`value`, `label`, and an optional `type`. The component returns JSX code that
renders an input element with the provided props. */
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
    return (
        <div className="relative">
            <input
                onChange={onChange}
                value={value}
                type={type}
                id={id}
                className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white 
                bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer 
                invalid:border-b-1"
                placeholder=" "
            />
            {
                /*
                The use of "appearance-none" removes default browser styles, "focus:outline-none" 
                removes the outline on focus, and "focus:ring-0" removes the focus ring. Additionally, 
                the "invalid:border-b-1" class indicates a specific border style for invalid inputs.
                When you need to style an element based on the state of a sibling element, mark the sibling 
                with the peer class
                 */
            }
            <label
                htmlFor={id}
                className="
                absolute text-md text-zinc-400 duration-150 transform -translate-y-3 *:scale-75 
                top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
                {
                    /*
                    - duration-150: duration for animation
                    - transform -translate-y-3: Initially translates the label up making it partially hidden
                    - origin-[0] sets the transform origin to the top-left corner, making the scaling and translation
                    transformation originate from this point
                    - peer-placeholder-shown: scale-100: specifies that when the input placeholder is shown,
                    the label should scale up to its original size 100%
                    - peer-placeholder-shown: translate-y-0: specifies that when the input placeholder is shown,
                    the label is not translated and remains at its original position
                    - peer-focus: scale-75: When the input is in focus, the label is scaled down to 75%
                    - peer-focus: -translate-y-3: specifies that when the input is in focus, the label
                    translates up by 3 units

                     */
                }
                {label}
            </label>
        </div>
    )
}

export default Input;