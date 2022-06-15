import React from "react";
import useModalProvider from "./usemodal";
import {Booking_modal} from '../components/booking_modal'


const content = {
    // handleModal: React.Dispatch<React.SetStateAction<object>>,
    modalContent: {
        id:1,
        name: "Tårnbyvej 88, 2770 Kastrup",
        timeslot: ['00:00', "00:00"],
        opening: ["09:00", "19:00"],
        coord: [55.633713, 12.606089],
        bookings:[],
        modal:false,
    },
}

const ModalContext = React.createContext({content});

const ModalProvider = ({ children }: any) => {
    let { useModal, modalContent } = useModalProvider();
    return (
        <ModalContext.Provider value={{ useModal, modalContent }}>
            <Booking_modal/>
            {children}
        </ModalContext.Provider>
    );
};
export { ModalContext, ModalProvider } 