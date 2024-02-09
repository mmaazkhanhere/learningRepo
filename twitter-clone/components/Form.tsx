/*A react component that provides a form for creating new tweets or comments,
handles user authentication */

import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';

interface FormProps {
    placeholder: string; //placeholder for the input component
    isComment?: boolean; /*A boolean indicating whether the form is for posting
    a comment */
    postId?: string; /*the id of the post to which the comment is being added */
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {

    const registerModal = useRegisterModal(); //handles the registration modal
    const loginModal = useLoginModal(); //handles the login modal

    const { data: currentUser } = useCurrentUser(); /*get the data of the
    current user logged in */

    const { mutate: mutatePosts } = usePosts(); //manually refetch all posts
    const { mutate: mutatePost } = usePost(postId as string); /*Manually 
    refetch a specific post */

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        /*The function is triggered when the form is submitted */
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
            /*Constructs a URL for the API request based on whether is a 
            comment or a post */

            await axios.post(url, { body }); /*makes a post request to the 
            appropriate endpoint with the tweet/comment body */

            toast.success('Tweet created'); //display a success notification
            setBody(''); /*Set the body to empty string */

            mutatePosts(); //updates the post data using mutate function
            mutatePost();

        } catch (error) {
            toast.error('Something went wrong'); //error notification
        } finally {
            setIsLoading(false); //the loading state is set to false
        }
    }, [body, mutatePosts, isComment, postId, mutatePost]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {/*If user exists and is authenticated */}
            {
                currentUser ? (
                    <div className="flex flex-row gap-4">
                        {/*User avatar */}
                        <div>
                            <Avatar userId={currentUser?.id} />
                        </div>

                        <div className="w-full">
                            {/*Text area to write post or tweet */}
                            <textarea
                                disabled={isLoading}
                                onChange={(event) => setBody(event.target.value)}
                                value={body}
                                className="
                                disabled:opacity-80
                                peer
                                resize-none 
                                mt-3 
                                w-full 
                                bg-black 
                                ring-0 
                                outline-none 
                                text-[20px] 
                                placeholder-neutral-500 
                                text-white
                            "
                                placeholder={placeholder}>
                            </textarea>

                            {/*Break */}
                            <hr
                                className="
                                opacity-0 
                                peer-focus:opacity-100 
                                h-[1px] 
                                w-full 
                                border-neutral-800 
                                transition"
                            />

                            {/*Button */}
                            <div className="mt-4 flex flex-row justify-end">
                                <Button
                                    disabled={isLoading || !body}
                                    onClick={onSubmit}
                                    label="Tweet"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8">
                        {/*Title */}
                        <h1 className="text-white text-2xl text-center mb-4 font-bold">
                            Welcome to Twitter
                        </h1>

                        {/*Buttons */}
                        <div className="flex flex-row items-center justify-center gap-4">
                            <Button
                                label="Login"
                                onClick={loginModal.onOpen}
                            />
                            <Button
                                label="Register"
                                onClick={registerModal.onOpen}
                                secondary
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Form;