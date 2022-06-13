import * as React from 'react';
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

type PlaceType = {
  name: string,
  opening: string[],
  bookings: [
    {
      User_id: string,
      period: string[]
    }
  ]
};

type BookingsType = {
  from: string,
  to: string
};
interface PlaceProps {
  place: PlaceType,
  bookings: BookingsType
}

const Place: React.FC<PlaceProps> = ({ place }): JSX.Element => {
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
        return _.flatten(remaining.map(r => r.subtract(o)))
      }, [s])
      return remaining
    }))
  }

  let booked: any[] = []
  place.bookings.forEach(e => {
    const from = moment(`${today} ${e.period[0]}`)
    const to = moment(`${today} ${e.period[1]}`)
    const booking = moment.range(from, to);
    booked.push(booking)
  })
  let availability = subtractRanges([range], booked);

  const availableInfo = availability.map((e, index) => {
    return <Typography key={index+e.start} sx={{ textAlign: "left" }} component="p">{e.start.format("HH:mm")} - {e.end.format("HH:mm")}</Typography>
  })
  const bookedInfo = booked.map((e, index) => {
    return <Typography key={index+e.start} sx={{ textAlign: "left" }} component="p">{e.start.format("HH:mm")} - {e.end.format("HH:mm")}</Typography>
  })
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ textAlign: "left" }} component="p">
          {place.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
      

      <Stack
            direction="column"
            spacing={2}
            sx={{textAlign:"left"}}
            >
          <Typography sx={{ textAlign: "left" }} component="h2">Open {place.opening[0]} - {place.opening[1]}</Typography>
          <Typography sx={{ textAlign: "left" }} component="p">Available today</Typography>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
              
          {availableInfo}
          </Stack>
          
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