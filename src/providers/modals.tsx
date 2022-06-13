import React from "react";
import useModal from "./usemodal";
import {Booking_modal} from '../components/booking_modal'


const context = {
    modal: false,
    handleModal: {
        timeslot: ['00:00', "00:00"],
        place: {
            id:1,
            name: "Tårnbyvej 88, 2770 Kastrup",
            opening: ["09:00", "19:00"],
            coord: [55.633713, 12.606089],
            bookings:[]
        }

    }
}
const ModalContext = React.createContext(context);
const ModalProvider = ({ children }: any) => {
    let { modal, handleModal, modalContent } = useModal();
    return (
        <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
            <Booking_modal/>
            {children}
        </ModalContext.Provider>
    );
};
export { ModalContext, ModalProvider }