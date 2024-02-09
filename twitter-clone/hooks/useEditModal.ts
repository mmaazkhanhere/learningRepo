/*Creates a Zustand store to manage the state of a modal component. It provides
functions to open and close the modal, along with a boolean value indicating
whether the modal is currently open or close */

import { create } from 'zustand';

interface EditModalStore {
    isOpen: boolean; //boolean indicating whether the modal is open or closed
    onOpen: () => void; //function to open the modal
    onClose: () => void; //function to close the modal
}

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false, //initially, the modal is closed
    onOpen: () => set({ isOpen: true }), //function to open the modal
    onClose: () => set({ isOpen: false }) //function to close the modal
}));


export default useEditModal;