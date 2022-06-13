import React from "react";
import {BookingProps} from '../services/types'

export default function useModal () {
  let [modal, setModal] = React.useState<boolean>(false);
  let [modalContent, setModalContent] = React.useState<BookingProps | boolean>({
    id:1,
    name: "Tårnbyvej 88, 2770 Kastrup",
    opening: ["09:00", "19:00"],
    coord: [55.633713, 12.606089],
    bookings:[],
    timeslot: ["09:00", "19:00"],
});
  let handleModal = (content:BookingProps) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};
