/*Defines a custom react hook that uses the Zustand library. This hook is 
designed  to manage the state of register modal using onOpen and onClose
functions */

import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void; //opens the modal
    onClose: () => void; //closes the modal
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false, //initially the modal is closed
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useRegisterModal;