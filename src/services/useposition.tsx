import { useState, useEffect } from 'react';

interface Coords {
    latitude: number;
    longitude: number;
}

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState<string | null>(null);
    const onChange = (response :any) => {
        console.log(response)
        const { latitude, longitude }: Coords = response.coords;
        setPosition({
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

