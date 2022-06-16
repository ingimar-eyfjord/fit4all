 import React from 'react';
import useModalProvider from "./usemodal";
import {BookingModal} from '../components/booking_modal'

let ModalContext:any;
const ModalProvider = ({ children }: any) => {
    let { modal, useModal, modalContent } = useModalProvider();
    const content = {
        useModal: useModal,
        modalContent: {
            id:1,
            address: "Tårnbyvej 88, 2770 Kastrup",
            timeslot: ['00:00', "00:00"],
            opening: ["09:00", "19:00"],
            coord: [55.633713, 12.606089],
            bookings:[],
        },
        modal
    }

    let { Provider } = (ModalContext = React.createContext(content));  
    return (
        <Provider value={{ modal, useModal, modalContent }}>
            <BookingModal/>
            {children}
        </Provider>
    );
};
export { ModalContext, ModalProvider } 