/*Manages the state related to a modal, including whether it is open, the 
associated movieID and methods to open and close the modal. */

import { create } from 'zustand';

export interface ModalStoreInterface {
    movieId?: string; //optional movieID
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set: any) => ({
    /*uses the create function from Zustand to create a store. The store is
    initialized when an object representing the initial state. Has two 
    properties movieId and isOpen
    */
    movieId: undefined, /*represents the ID of the movie associated with the 
    modal and is initally undefined */

    isOpen: false, /*represents whether the modal is open or closed. It is
    initially set to false */

    openModal: (movieId: string) => set({ isOpen: true, movieId }), /*Takes a
    movieId as an argument and sets the isOpen state to true while updating
    the movieId state with the provided ID */

    closeModal: () => set({ isOpen: false, movieId: undefined }),/*sets the 
    isOpen state to false and resets the movieId state to undefined */
}));

export default useInfoModalStore;