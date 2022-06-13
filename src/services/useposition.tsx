import React, { useState, useContext ,useEffect} from 'react';
import { GlobalState } from "../providers/store";

interface Coords {
    latitude: number;
    longitude: number;
}

export const usePosition = () => {
  const [store, setStore] = useContext(GlobalState);

    const [position, setPosition] = useState({});
    const [error, setError] = useState<string | null>(null);
    const onChange = (response: any) => {
        const { latitude, longitude }: Coords = response.coords;
        setPosition({
            latitude: latitude,
            longitude: longitude,
        });
        setStore({
            latitude: latitude,
            longitude: longitude,
        });
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
    return { ...position, error };
}

