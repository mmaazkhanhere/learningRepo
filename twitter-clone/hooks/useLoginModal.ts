/*Creates a zustand powered custom hook for managing the state of a modal
component. It provides functions like onOpen and onClose to control the modal
visibility. This hook is used to manage and control the registration modal's 
state in their React application*/

import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean; // a boolean prop indicating whether the modal is open or closed
    onOpen: () => void; //function to call to open the modal
    onClose: () => void; //function to call to close the modal
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false, //the modal is initially closed
    onOpen: () => set({ isOpen: true }), //set the modal to open
    onClose: () => set({ isOpen: false }) //set the modal to close
}));


export default useRegisterModal;