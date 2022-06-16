import { useState, useEffect, useCallback, useContext } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as _ from 'lodash'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { PlaceType } from '../services/types'
import { ModalContext } from '../providers/modals'
import {Time_ranger} from './time_ranger'

interface PlaceProps {
  place: PlaceType,
}

const Place: React.FC<PlaceProps> = ({ place }): JSX.Element => {
  let { useModal } = useContext(ModalContext);
  const moment = extendMoment(Moment);
  const today = moment().format('YYYY-MM-DD')
  const opening = moment(`${today} ${place.opening[0]}`)
  const closing = moment(`${today} ${place.opening[1]}`)
  const range = moment.range(opening, closing);

  function subtractRanges(source: any[], others: any[]) {
    if (!Array.isArray(source)) {
      source = [source]
    }
    return _.flatten(source.map(s => {
      return _.flatten(others).reduce((remaining, o) => {
        return _.flatten(remaining.map((r: any) => r.subtract(o)))
      }, [s])
    }))
  }

  let booked: any[] = []
  for (const e of place.bookings) {
    const from = moment(`${today} ${e.from}`)
    const to = moment(`${today} ${e.to}`)
    const booking = moment.range(from, to);
    booked.push(booking)
  }


  booked = _.orderBy(booked, [(item) => {
    return moment(item.to).format('YYYY-MM-DD')
  }], ['asc'])

  let availability = subtractRanges([range], booked);

  const availableInfo = availability.map((e, index) => {
    return <Typography key={index + e.start} sx={{ textAlign: "left" }} component="p">{e.start.format("HH:mm")} - {e.end.format("HH:mm")}</Typography>
  })
  const bookedInfo = booked.map((e, index) => {
    return <Typography key={index + e.start} sx={{ textAlign: "left" }} component="p">{e.start.format("HH:mm")} - {e.end.format("HH:mm")}</Typography>
  })

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ textAlign: "left" }} component="p">
          {place.address}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          spacing={2}
          sx={{ textAlign: "left" }}
        >
          <Typography sx={{ textAlign: "left" }} component="h2">Open {place.opening[0]} - {place.opening[1]}</Typography>
          <Typography sx={{ textAlign: "left" }} component="p">Available today</Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>

            {availableInfo}
          </Stack>
          <Time_ranger place={place}/>
          <Typography sx={{ textAlign: "left" }} component="p">Booked between</Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
            {bookedInfo}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>

  )

};

export default Place;