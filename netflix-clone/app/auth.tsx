import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/Input';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');// state variable for email with initial value set to ''
    const [name, setName] = useState(''); //state variable for name with initial value set to ''
    const [password, setPassword] = useState(''); // state variable for password with initial value set to ''

    const [variant, setVariant] = useState('login'); // state variable for variant with initial value set to 'login'

    /* The `toggleVariant` function is a callback function that is used to toggle
    between the 'login' and 'register' variants. It is created using the
    `useCallback` hook, which memoizes the function so that it is only recreated
    if its dependencies change. */
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/profiles');
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });

            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);

    return (
        /* 
        The background image is set to cover the entire
        element, be centered, and fixed in place. The "relative" class is used
        to position the element relative to its normal position. The "h-full"
        and "w-full" classes are used to set the height and width of the element
        to 100% of its parent container. 
        */
        <div
            className="relative h-full w-full bg-[url('/images/hero.jpg')] 
            bg-no-repeat bg-center bg-fixed bg-cover"
        >
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                {
                    /* The `<div className="bg-black w-full h-full lg:bg-opacity-50">` is
                    setting the background color of the div to black (`bg-black`) and
                    making it cover the entire width and height of its parent container
                    (`w-full h-full`). Additionally, it sets the background opacity to
                    50% for large screens (`lg:bg-opacity-50`). This makes the hero
                    image in background appear a bit darker*/
                }
                <nav className="px-12 py-5">
                    {
                        /*
                        Navigation element with padding of 48px on both left and right side
                        and with padding of 20 on both above and below
                        */
                    }

                    <img src="/images/logo.png" className="h-12" alt="Logo" />
                    {
                        /* The `<img>` element is displaying an image with the source
                    set to "/images/logo.png". The `className="h-12"` attribute
                    sets the height of the image to 12 units (48px). The `alt="Logo"`
                    attribute provides alternative text for the image, which is
                    displayed if the image fails to load or for accessibility
                    purposes. */
                    }
                </nav>

                <div className="flex justify-center">
                    {
                        /* 
                        The `<div className="flex justify-center">` is applying flexbox
                        styling to the div element. The `flex` class sets the display
                        property of the div to flex, allowing its child elements to be
                        laid out in a flexible manner. The `justify-center` class
                        centers the child elements horizontally within the div. 
                        */
                    }
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 self-center 
                        mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
                    >
                        {
                            /*
                            Sets the background to black with opacity of 70%. Some 
                            padding is applied both on x-axis and y-axis. 'self
                            center' align the div along the center of the container
                            cross axis. For tablet screen, the max width is set to
                            medium (448px) and the corner of div element is rounded
                            to medium (6px)
                            */
                        }

                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {
                                /* The `<h2 className="text-white text-4xl mb-8
                                font-semibold">` is defining a heading element which
                                os white and whose font size is 36px. The font is
                                semibold. A padding is applied to the bottom of the 
                                heading element.
                                */
                            }
                            {
                                variant === 'login' ? 'Sign in' : 'Register'
                                /*If user is in login page, sign in will appear
                                as heading. If user is registering itself, register
                                will appear */
                            }
                        </h2>

                        <div className="flex flex-col gap-4">
                            {
                                /* The `<div className="flex flex-col gap-4">` is applying
                                flexbox styling to the div element. The `flex` class
                                sets the display property of the div to flex, allowing
                                its child elements to be laid out in a column direction.
                                The `flex-col` class sets the flex direction to column,
                                meaning the child elements will be stacked vertically.
                                The `gap-4` class adds a gap of 4 units (16px) between
                                each child element. */
                            }
                            {
                                /*if user is registering themselves, this input field for
                                username will appear. While signing in, this input field 
                                will not be displayed*/

                                variant === 'register' && (
                                    <Input
                                        id="name"
                                        type="text"
                                        label="Username"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />
                                    /* The `<Input>` component is a custom
                                    component that is being used to render an
                                    input field. */

                                )}
                            <Input
                                id="email"
                                type="email"
                                label="Email address or phone number"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                id="password"
                                label="Password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={variant === 'login' ? login : register}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 
                            hover:bg-red-700 transition"
                        >
                            {
                                /* The `<button>` element is rendering a button component.
                                The `onClick` attribute specifies the function to be
                                executed when the button is clicked. In this case, it
                                checks the value of the `variant` state variable. If the
                                `variant` is set to `'login'`, it calls the `login`
                                function. If the `variant` is set to `'register'`, it
                                calls the `register` function. */
                            }
                            {
                                variant === 'login' ? 'Login' : 'Sign up'
                                /*if user is in login page, login will be displayed as button
                                otherwise sign up will be displayed */
                            }
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">

                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center 
                                cursor-pointer hover:opacity-80 transition"
                            >
                                {
                                    /* The above code is rendering a `<div>` element with a
                                    click event handler. When the `<div>` is clicked, it
                                    calls the `signIn` function with the argument
                                    `'google'` and an object `{ callbackUrl: '/profiles'
                                    }`. This code is likely part of a larger React
                                    component and is used to handle the sign-in
                                    functionality, specifically for signing in with
                                    Google. */
                                }
                                <FcGoogle size={32} />
                            </div>

                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center 
                                cursor-pointer hover:opacity-80 transition"
                            >
                                {
                                    /* The above code is rendering a `<div>` element with a
                                    click event handler. When the `<div>` is clicked, it
                                    calls the `signIn` function with the parameters
                                    `'github'` and `{ callbackUrl: '/profiles' }`. This
                                    code is likely part of a larger React component and
                                    is used to handle the sign-in functionality with
                                    GitHub. */
                                }
                                <FaGithub size={32} />
                            </div>

                        </div>

                        <p className="text-neutral-500 mt-12">
                            {
                                variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'
                                /*If user is in login page, it will be display the first message otherwise
                                will display 'already have an account' message */
                            }
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                                {
                                    /* The above code is rendering a clickable text element
                                    that toggles between "Create an account" and "Login"
                                    based on the value of the `variant` state variable.
                                    When clicked, it calls the `toggleVariant` function. */
                                }
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Auth;