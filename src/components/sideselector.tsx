
import { useState, useContext, useEffect, useCallback } from 'react';
import Place from './place'
import { make_json } from '../services/make_json'
import Functions from '../services/functions'
import { GlobalState } from "../providers/store";
import { PlaceTypes } from "../services/types"

export default function SideSelector() {
    const [courts, setCourts] = useState<PlaceTypes>();
    const [Store] = useContext(GlobalState);

    const sortCourts = useCallback(
        async () => {
            if (Store.Location && courts) {
                const copy = [...courts]
                for (const e of copy) {
                    e.distance = parseFloat( Functions.haversine_distance(Store.Location.latitude, Store.Location.longitude, e.coord[0], e.coord[1]).toFixed(2))
                }
                let sorted = copy.sort((a, b) => a.distance - b.distance)
                setCourts(sorted)
            }
        },
        [courts, Store],
    )

    useEffect(() => {
        // Fetch places, most likely from fetch statment, which should be in a callback async function
        if (Store.Location && courts){
            sortCourts()
        } 
    }, [Store.Location])


    useEffect(() => {
        // Fetch places, most likely from fetch statment, which should be in a callback async function
        setCourts(make_json())
    }, [])


    return (
        <>
            {courts && courts.map((e, index) => {
                return <Place key={index} place={e} />;
            })}
        </>
    )
}