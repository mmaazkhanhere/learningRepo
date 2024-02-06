/*A react component that represents a modal for user registration which uses
zustand for managing the modal open/close state and axios for making API
requests */

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {

    const loginModal = useLoginModal(); //manage the state of login modal
    const registerModal = useRegisterModal(); //manage the state of register modal

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    const onToggle = useCallback(() => {
        /*Function that handles the registration process when the user
        submits the registration form */
        if (isLoading) {
            /*If Loading is true, it returns early to prevent actions if a
            process is in progress */
            return;
        }

        registerModal.onClose(); //closes the registration modal
        loginModal.onOpen(); //opens the login modal
    }, [loginModal, registerModal, isLoading]);


    const onSubmit = useCallback(async () => {
        /*Function handles the registration process when the user submits the
        registration form */
        try {
            setIsLoading(true); //loading state is true

            await axios.post('/api/register', {
                email,
                password,
                username,
                name,
            }); /*makes a post request with the provided user data */

            setIsLoading(false) /*Loading state is set false and success
            notification is being displayed */

            toast.success('Account created.');

            signIn('credentials', {
                email,
                password,
            }); /*authenticate the user */

            registerModal.onClose(); //closes the register modal
        } catch (error) {
            toast.error('Something went wrong'); //error notification
        } finally {
            setIsLoading(false);
        }
    }, [email, password, registerModal, username, name]);


    const bodyContent = (
        /*Defines the content of the modal body which consist of four input
        component for entering email, username, name, and password */
        <div className="flex flex-col gap-4">
            <Input
                disabled={isLoading}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )


    const footerContent = (
        /*Footer content of the modal that switches to the login modal
        if user already exists */
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                    onClick={onToggle}
                    className="
                        text-white 
                        cursor-pointer 
                        hover:underline
                    "
                > Sign in</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading} /*disbales the entire modal when is loading */
            isOpen={registerModal.isOpen} //opens the register modal
            title="Create an account" //title of the modal
            actionLabel="Register" //button label
            onClose={registerModal.onClose} //on close register modal
            onSubmit={onSubmit} //submit functionality
            body={bodyContent} //content of the modal
            footer={footerContent} //content of the modal footer
        />
    );
}

export default RegisterModal;