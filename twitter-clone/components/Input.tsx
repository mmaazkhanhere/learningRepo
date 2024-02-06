/*A customizable input field that takes various props to control its 
appearance, value, and behavior making it versatile for different use cases */

interface InputProps {
    placeholder?: string;/*An optional string prop for the input field's 
    placeholder text */
    value?: string; //an optional string prop for the input field's value
    type?: string; //optional string prop for the input type (default is "text")
    disabled?: boolean; //optional boolean prop that can disable the input field
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; /*A callback
    function that can handles the input fields change events */
    label?: string; /*optional label prop of the input field */
}

const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
    return (
        <div className="w-full">
            {/*Input field label */}
            {
                label && <p className="text-xl text-white font-semibold mb-2">
                    {label}
                </p>
            }
            {/*Input field */}
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
                className="
                    w-full
                    p-4 
                    text-lg 
                    bg-black 
                    border-2
                    border-neutral-800 
                    rounded-md
                    outline-none
                    text-white
                    focus:border-sky-500
                    focus:border-2
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                "
            />
        </div>
    );
}

export default Input;

/*Install zustand for global state management */