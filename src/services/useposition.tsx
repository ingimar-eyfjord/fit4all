import React, { useState, useContext ,useEffect} from 'react';
import { GlobalState } from "../providers/store";

interface Coords {
    latitude: number;
    longitude: number;
}
// const Child = ({ setValue2 }: { setValue2: React.Dispatch<React.SetStateAction<string>> }) => {

export const usePosition = () => {
    const [Store, setStore] = useContext(GlobalState);
    const [error, setError] = useState<string | null>(null);
    const onChange = (response: any) => {
    const { latitude, longitude }: Coords = response.coords;
      setStore({Location:{
        latitude: latitude,
        longitude: longitude,
    }})
    };
    const onError = (error: any) => {
        setError(error);
    };
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }
        let watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
    }, []);
    return null;
}

