/*A react component which creates a modal dialog with customizable content
and actions */

import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
    isOpen?: boolean; /*An optional prop that controls whether the modal is open
    or close */
    onClose: () => void; // a callback function to close the modal
    onSubmit: () => void; // a callback function for handling the submit action
    title?: string; //optional string prop for the modal title
    body?: React.ReactElement; /*optional prop for the modal content that is
    a React component */
    footer?: React.ReactElement; /*optional prop for the modal footer content
    that is a React component */
    actionLabel: string; //label of the action button
    disabled?: boolean;/*An optional prop that can disable the modal and 
    its action */
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => { //destructuring the props

    const handleClose = useCallback(() => {
        //function to handle closing of the modal
        if (disabled) {
            return; //if disabled, return nothing
        }
        onClose(); //close the modal
    }, [onClose, disabled]);


    const handleSubmit = useCallback(() => {
        //function to handle submit of the modal
        if (disabled) {
            return; //if disabled, return nothing
        }
        onSubmit(); //submit the modal
    }, [onSubmit, disabled]);


    if (!isOpen) {
        //if the modal is not open, return nothing
        return null;
    }


    return (

        <div
            className="
                justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed 
                inset-0 
                z-50 
                outline-none 
                focus:outline-none
                bg-neutral-800
                bg-opacity-70
            "
        >{/*Styling for the background when the modal is displayed */}

            <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
                {/*content*/}
                <div className="
                    h-full
                    lg:h-auto
                    border-0 
                    rounded-lg 
                    shadow-lg 
                    relative 
                    flex 
                    flex-col 
                    w-full 
                    bg-black 
                    outline-none 
                    focus:outline-none
                "
                >
                    {/*header*/}
                    <div className="
                        flex 
                        items-center 
                        justify-between 
                        p-10 
                        rounded-t
                    "
                    >
                        {/*Title */}
                        <h3 className="text-3xl font-semibold text-white">
                            {title}
                        </h3>
                        {/*Close Button */}
                        <button
                            className="
                                p-1 
                                ml-auto
                                border-0 
                                text-white 
                                hover:opacity-70
                                transition
                                "
                            onClick={handleClose}
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-10 flex-auto">
                        {body}
                    </div>
                    {/*footer*/}
                    <div className="flex flex-col gap-2 p-10">
                        <Button
                            disabled={disabled}
                            label={actionLabel}
                            secondary
                            fullWidth
                            large
                            onClick={handleSubmit}
                        />
                        {footer}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Modal;