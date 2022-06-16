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

    if (modal) {
      return ReactDOM.createPortal(
        <div id="modal" onClick={e => { HandleModal() }}>
          <Card id="booking_card" sx={{ minWidth: 275 }}>
  
            <CardHeader
              action={
                <Button onClick={e => { HandleModal() }} variant="contained" endIcon={<CloseIcon />}>
                  Cancel
                </Button>
              }
              title={modalContent.name}
              subheader={`${modalContent.start}-${modalContent.end}`}
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
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
