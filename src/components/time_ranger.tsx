import { useState, useEffect, useCallback, useContext } from "react";
import moment from "moment";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { PlaceType } from '../services/types'
import { ModalContext } from '../providers/modals'

interface PlaceProps {
    place: PlaceType,
}

export const Time_ranger: React.FC<PlaceProps> = ({ place }): JSX.Element => {
    let { useModal } = useContext(ModalContext);
    const [booking, setBookingState] = useState({
        start: "09:00",
        end: "17:30",
        place: place
    });

    return (
        <>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={3}
            >
                <TextField
                    name='Time_Start'
                    id='Time_Start'
                    label='Time start'
                    type='time'
                    defaultValue='09:00'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={(e) => {
                        setBookingState((booking) => ({
                            ...booking,
                            start: e.target.value,
                        }));
                    }}
                />{" "}
                <TextField
                    name='Time_End'
                    id='Time_End'
                    label='Time end'
                    type='time'
                    defaultValue='17:30'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    onChange={(e) => {
                        setBookingState((booking) => ({
                            ...booking,
                            end: e.target.value,
                        }));
                    }}
                    sx={{ width: 150 }}
                />
                <Button onClick={e => { useModal(booking) }} variant="contained" startIcon={<EventAvailableIcon />}>
                    Book
                </Button>
            </Stack>
        </>
    );
}

