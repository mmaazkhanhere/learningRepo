/*A customizable modal for user login that manages the login form, uses next-auth
authentication and can switch to a registration modal. The component is integrated
with zustand for state management and react hot toast for notification */

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {

    const loginModal = useLoginModal(); /*custom hooks for managing the state 
    of login*/
    const registerModal = useRegisterModal(); /*custom hooks for managing 
    the state of register*/

    const [email, setEmail] = useState(''); //email of the user
    const [password, setPassword] = useState(''); //password of the user
    const [isLoading, setIsLoading] = useState(false); //loading state

    const onSubmit = useCallback(async () => {
        /*This function handles the logic when the user submits the login form */
        try {
            setIsLoading(true); /*set the loading state to true indicating that 
            the login is in progress */

            await signIn('credentials', {
                email,
                password,
            }); /*calls the signIn with credentials passing the email and 
            password */

            toast.success('Logged in'); /*If login process succeed, a 
            notification will be displayed */

            loginModal.onClose(); /*close the login modal */
        } catch (error) {
            toast.error('Something went wrong'); /*error notification */
        } finally {
            setIsLoading(false);
            /*the loading state is set to false meaning that the login process
            is completed now */
        }
    }, [email, password, loginModal]);

    const onToggle = useCallback(() => {
        /*function that is triggered when the user clicks on Create new account.
        The login modal is closed the register modal is opened to allow user
        to register themselves */

        loginModal.onClose(); //close the login modal
        registerModal.onOpen(); //open the register modal
    }, [loginModal, registerModal])

    const bodyContent = (
        /*defines the content of the modal's body which consists of two input
        component of email and password */
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        /*Defines the content of the modal's footer which includes a link
        to create a new account */
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Twitter?
                <span
                    onClick={onToggle}
                    className="
                    text-white 
                    cursor-pointer 
                    hover:underline
                "
                > Create an account</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading} /*The entire modal is disabled during loading */
            isOpen={loginModal.isOpen} /*The login modal is open*/
            title="Login" /*the title is set to login */
            actionLabel="Sign in" /*The button label */
            onClose={loginModal.onClose} /*Function that closes the modal */
            onSubmit={onSubmit} //action performed when the form is submitted
            body={bodyContent} //content of the modal
            footer={footerContent} //footer content of the modal
        />
    );
}

export default LoginModal;