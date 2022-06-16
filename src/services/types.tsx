export type BookingsType = {
    user_id: string,
    from: string,
    to: string
  };
  
export type PlaceType = {
    id: number,
    address: string,
    opening: string[],
    bookings: BookingsType[]
    coord: number[]
    distance: number
  };

  export type BookingProps = {
    timeslot: string[],
    opening: string[],
    coord: number[]
    id:number,
    address: string,
    bookings: BookingsType[]
  }; 

  export type PlaceTypes = {
    id: number,
    address: string,
    opening: string[],
    bookings: BookingsType[]
    coord: number[]
    distance: number

  }[];
 
  export type ModalContent = {
      id: number,
      address: string,
      opening: string[],
      bookings: any,
      coord: number[],
      timeslot: string[],
  }

  export type Coords = {
    lat: string[],
    long: string[],
    }