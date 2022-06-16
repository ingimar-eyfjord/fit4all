import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "..//providers/modals";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
export const BookingModal = () => {
  let { modal, useModal, modalContent  } = React.useContext(ModalContext);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
    const HandleModal = ()=>{
      useModal(false) 
    }
console.log(modalContent)
    if (modal) {
      return ReactDOM.createPortal(
        <div id="modal" onClick={e => { HandleModal() }}>
          <Card id="booking_card" sx={{ minWidth: 275 }}>
  
            <CardHeader
              action={
               
                <CloseIcon sx={{padding:"1rem"}} onClick={e => { HandleModal() }} />
              }
              title={modalContent.place.address}
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
               Ingimar Eyfjord Smarason
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Confirm your booking for
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {modalContent.place.address}
              </Typography>
              
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {moment().format("DD-MM-YYYY")} at {modalContent.start}-{modalContent.end}
              </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" endIcon={<CheckIcon />}>
                  Confirm
                </Button>
            </CardActions>
          </Card>
        </div>
  
        ,
        document.querySelector("#modal-root") as HTMLElement
      );
    } else return null;

};
