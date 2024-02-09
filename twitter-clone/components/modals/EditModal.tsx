/*A react component that allows users to edit their profile information through
a modal interface. It fetches the current user data, pre-populates the form 
fields with this data and updates the user profile upon submission */

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const EditModal = () => {

    const { data: currentUser } = useCurrentUser();/*fetch the current user data
    that is logged in*/

    const { mutate: mutateFetchedUser } = useUser(currentUser?.id); /* fetch 
    data about a specific user based on their id. The mutate function returned
    is aliased as mutateFetchedUser, which is typically used to trigger a
    re-fetch of user data after an operation ensuring the UI reflects the 
    most recent changes. When you call mutateFetchedUser, it sends a request
    to re-fetch the user data from the server */

    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        /*The component is re-render when any of the data in the dependency
        array is changed. Inside the effect, it sets the local state variable
        to corresponding user data */

        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        /*A callback hook to handle form submission. It is called when the user
        submits the form to update their profile information */
        try {
            setIsLoading(true); //indicates that a form submission is in progress

            await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
            /*http request is made to the api endpoint with the updated
            profile information */

            mutateFetchedUser();

            toast.success('Updated');

            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

    const bodyContent = (
        /*Content of the modal */
        <div className="flex flex-col gap-4">
            {/*Profile Image */}
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />

            {/*Cover Image */}
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />

            {/*Name */}
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            {/*Username */}
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />

            {/*Bio */}
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;