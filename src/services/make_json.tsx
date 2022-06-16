
import { BookingsType, PlaceTypes } from '../services/types'



class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

const basic: PlaceTypes = [
  {
    id: 2,
    address: "Gærdebred 13, 2300 København",
    opening: ["09:00", "20:00"],
    coord: [55.652601, 12.591215],
    bookings: [],
    distance: 0
  },
 
  {
    id: 4,
    address: "Ingrid Marievej 92, 2500 København",
    opening: ["09:00", "17:00"],
    coord: [55.655967, 12.50524],
    bookings: [],
    distance: 0
  },
  {
    id: 5,
    address: "Ryesgade 25C, 2200 København",
    opening: ["09:00", "19:00"],
    coord: [55.692496, 12.566403],
    bookings: [],
    distance: 0
  },
  {
    address: "Løjtegårdsvej 18, 2770 Kastrup",
    id: 6,
    opening: ["09:00", "22:00"],
    coord: [55.623319, 12.623381],
    bookings: [],
    distance: 0
  },
  {
    address: "Slotsherrens Vænge 4, 2610 Rødovre",
    opening: ["09:00", "20:00"],
    coord: [55.699658, 12.45874],
    id: 7,
    bookings: [],
    distance: 0
  },
  {
    id: 3,
    address: "Genuavej 35, 2300 København",
    opening: ["09:00", "23:00"],
    coord: [55.657641, 12.625566],
    bookings: [],
    distance: 0
  },
  {
    address: "2600 Glostrup Municipality",
    opening: ["09:00", "21:00"],
    coord: [55.661777, 12.385871],
    id: 8,
    bookings: [],
    distance: 0
  },
  {
    address: "Carsten Niebuhrs Gade, 1577 København",
    opening: ["09:00", "20:00"],
    coord: [55.668937, 12.57032],
    id: 9,
    bookings: [],
    distance: 0
  }, {
    id: 1,
    address: "Tårnbyvej 88, 2770 Kastrup",
    opening: ["09:00", "19:00"],
    coord: [55.633713, 12.606089],
    bookings: [],
    distance: 0
  },
];

const bookings = [
  ["09:00", "10:00"],
  ["10:00", "11:00"],
  ["11:00", "12:00"],
  ["12:00", "13:00"],
  ["13:00", "14:00"],
  ["14:00", "15:00"],
  ["15:00", "16:00"],
  ["16:00", "17:00"],
  ["17:00", "18:00"],
  ["18:00", "19:00"],
  ["19:00", "20:00"],
  ["20:00", "21:00"],
  ["21:00", "22:00"],
  ["22:00", "23:00"],
];


function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
let numberGenerator = function (arr: number[]) {
  if (arr.length >= getRandomInt(2, 7)) return;
  let newNumber = getRandomInt(1, 12);
  if (arr.indexOf(newNumber) < 0) {
    arr.push(newNumber);
  }
  numberGenerator(arr);
};


export const make_json = () => {
  const places = [];
  for (const e of basic) {
    e.bookings = []
    const periods: number[] = []
    numberGenerator(periods);
    for (const p of periods) {
      let booking: BookingsType = {
        user_id: Guid.newGuid(),
        from: bookings[p][0],
        to: bookings[p][1]
      }
      e.bookings.push(booking)
    }
    places.push(e)
  }
  return places;
}
