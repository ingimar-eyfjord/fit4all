export type BookingsType = {
    user_id: string,
    from: string,
    to: string
  };
  
export type PlaceType = {
    id: number,
    name: string,
    opening: string[],
    bookings: BookingsType[]
    coord: number[]
  };

  export type BookingProps = {
    timeslot: string[],
    opening: string[],
    coord: number[]
    id:number,
    name: string,
    bookings: BookingsType[]
  }; 

  export type PlaceTypes = {
    id: number,
    name: string,
    opening: string[],
    bookings: BookingsType[]
    coord: number[]
  }[];


 
  export type ModalContent = {
      id: number,
      name: string,
      opening: string[],
      bookings: any,
      coord: number[],
      timeslot: string[],
  }
