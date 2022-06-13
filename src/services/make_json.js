import { Guid } from "guid-typescript";
const basic = [
  {
    name: "Tårnbyvej 88, 2770 Kastrup",
    opening: ["09:00", "19:00"],
    coord: [55.633713, 12.606089],
    bookings:[]
  },
  {
    name: "Gærdebred 13, 2300 København",
    opening: ["09:00", "20:00"],
    coord: [55.652601, 12.591215],
    bookings:[]
  },
  {
    name: "Genuavej 35, 2300 København",
    opening: ["09:00", "23:00"],
    coord: [55.657641, 12.625566],
    bookings:[]
  },
  {
    name: "Ingrid Marievej 92, 2500 København",
    opening: ["09:00", "17:00"],
    coord: [55.655967, 12.50524],
    bookings:[]
  },
  {
    name: "Ryesgade 25C, 2200 København",
    opening: ["09:00", "19:00"],
    coord: [55.692496, 12.566403],
    bookings:[]
  },
  {
    name: "Løjtegårdsvej 18, 2770 Kastrup",

    opening: ["09:00", "22:00"],
    coord: [55.623319, 12.623381],
    bookings:[]
  },
  {
    name: "Slotsherrens Vænge 4, 2610 Rødovre",
    opening: ["09:00", "20:00"],
    coord: [55.699658, 12.45874],
    bookings:[]
  },
  {
    name: "2600 Glostrup Municipality",
    opening: ["09:00", "21:00"],
    coord: [55.661777, 12.385871],
    bookings:[]
  },
  {
    name: "Carsten Niebuhrs Gade, 1577 København",
    opening: ["09:00", "20:00"],
    coord: [55.668937, 12.57032],
    bookings:[]
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


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
let numberGenerator = function (arr) {
    if (arr.length >= 6) return;
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
        const periods = []
        numberGenerator(periods);
    for (const p of periods) {
        let gui = Guid.create()
        let booking = {
            User_id: gui,
            period: bookings[p]
        }
        e.bookings.push(booking)
    }
    places.push(e)
  }
  return places;
}
