import React from "react";
import {ModalContent} from '../services/types'

export default function useModalProvider () {
  // let [modal, setModal] = React.useState<boolean>(false);

  let [modalContent, setModalContent] = React.useState<ModalContent>({
      id:1,
      name: "Tårnbyvej 88, 2770 Kastrup",
      opening: ["09:00", "19:00"],
      coord: [55.633713, 12.606089],
      bookings:[],
      timeslot: ["09:00", "19:00"],
      modal:false,
});

  let useModal = (content:ModalContent) => {
    setModalContent((state) => ({
      ...state,
      modal: !state.modal,
    }));
    if (content) {
      setModalContent(content);
    }
  };

  return [ useModal, modalContent ] as const;
};
