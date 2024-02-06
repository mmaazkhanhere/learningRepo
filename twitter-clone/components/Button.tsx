/*A flexible react component that creates customizable button with various
styles and behaviors. It accepts different props to configure the button's
appearance and behavior */

interface ButtonProps {
    label: string; //the text label to be displayed
    secondary?: boolean; /*optional boolean prop indicating whether the button
    should have a secondary (alternate) style */
    fullWidth?: boolean; /*An optional boolean prop indicating whether the
    button should take up the full width of container */
    large?: boolean; /*An optional prop whether the rendered button should be a 
    large button */
    onClick: () => void; /*A required callback function that will be executed
    when the button is clicked */
    disabled?: boolean; /*an optional prop indicating whether button should 
    be disabled */
    outline?: boolean; /*An optional boolean prop indicating whether the button
    should have an outline */
}

const Button: React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    onClick,
    large,
    disabled,
    outline
}) => { //destructing the props passed to the component
    return (
        <button
            disabled={disabled} //disabled when disabled prop is true
            onClick={onClick} //onCLick function run when click on button
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'} 
                ${secondary ? 'bg-white' : 'bg-sky-500'}
                ${secondary ? 'text-black' : 'text-white'}
                ${secondary ? 'border-black' : 'border-sky-500'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py-2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
            `} //conditional stylings
        >
            {label}
        </button>
    );
}

export default Button;