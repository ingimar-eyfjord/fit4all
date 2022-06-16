import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';
import { make_json } from '../services/make_json'
import marker_svg from './marker'
const logo = require("./marker.svg") as string;
interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
    setDistanceInKm: React.Dispatch<React.SetStateAction<number>>;
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}
// interface IMarkers {
//     address: string;
//     latitude: number;
//     longitude: number;
// }[]

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GooglePolyline = google.maps.Polyline;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false, setDistanceInKm }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    // const [initialMarkers, setInitialMarkers]  = useState<IMarkers>();
    const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
    const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
    const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
    const [LastLineHook, setLastLineHook] = useState<GooglePolyline>();

    const icons: Record<string, { icon: string }> = {
        courts: {
            icon: window.location.origin + '/assets/images/marker.png',
        },
    };


    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } else {
            const homeLocation = new google.maps.LatLng(55.6756165015799, 12.567361105967253);
            setHomeMarker(addHomeMarker(homeLocation));
            const places = make_json()
            // Create markers.
            for (const add of places) {
                let position = new google.maps.LatLng(add.coord[0], add.coord[1])
                const infowindow = new google.maps.InfoWindow({
                    content: add.address,
                  });
                const marker = new google.maps.Marker({
                    position: position,
                    // icon: marker_svg as string,
                    map: map,
                    title: add.address,
                });
                // marker.addListener("click", () => {
                //     infowindow.open({
                //       anchor: marker,
                //       map,
                //       shouldFocus: false,
                //     });
                //   });
            }
        }
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(55.6756165015799, 12.567361105967253);
        initMap(11, defaultAddress);
    };

    // const initEventListener = (): void => {
    //     if (map) {
    //         google.maps.event.addListener(map, 'click', function (e) {
    //             coordinateToAddress(e.latLng);
    //         })
    //     }
    // };
    // useEffect(initEventListener, [map]);

    const coordinateToAddress = async (coordinate: GoogleLatLng) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ location: coordinate }, function (results, status) {
            if (status === 'OK') {
                setMarker({
                    address: results[0].formatted_address,
                    latitude: coordinate.lat(),
                    longitude: coordinate.lng()
                })
            }
        });
    };

    useEffect(() => {
        if (marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
        }
    }, [marker]);

    const addMarker = (location: GoogleLatLng): void => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: logo,
        });
        setGoogleMarkers(googleMarkers => [...googleMarkers, marker]);
        const listenerId = marker.addListener('click', () => {
            const homePos = homeMarker?.getPosition();
            const markerPos = marker.getPosition();
            if (homePos && markerPos) {
                const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(homePos, markerPos);
                setDistanceInKm(Math.round(distanceInMeters / 1000));

                if (LastLineHook) {
                    LastLineHook.setMap(null);
                }

                const line = new google.maps.Polyline({
                    path: [
                        { lat: homePos.lat(), lng: homePos.lng() },
                        { lat: markerPos.lat(), lng: markerPos.lng() },
                    ],
                    icons: [
                        {
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                            },
                            offset: "100%"
                        }
                    ],
                    map: map,
                });

                setLastLineHook(line);
            }
        });

        setListenerIdArray(listenerIdArray => [...listenerIdArray, listenerId]);
    };
    useEffect(() => {
        listenerIdArray.forEach((listenerId) => {
            google.maps.event.removeListener(listenerId);
        });

        setListenerIdArray([]);
        setGoogleMarkers([]);
        googleMarkers.forEach((googleMarker) => {
            const markerPosition = googleMarker.getPosition();
            if (markerPosition) {
                addMarker(markerPosition);
            }
        });
    }, [LastLineHook]);

    const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
        const homeMarkerConst: GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            // icon: marker_svg,
            title: "Hello World!",
        });

        homeMarkerConst.addListener('click', () => {
            map?.panTo(location);
            map?.setZoom(6);
        });

        return homeMarkerConst;
    };
    


    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: false,
                    rotateControl: false,
                    scaleControl: true,
                    fullscreenControl: false,
                    panControl: false,
                    zoomControl: true,
                    gestureHandling: 'cooperative',
                    mapTypeId: mapType,
                    draggableCursor: 'pointer',
                })
            );
        }
    };

    return (
        <div className="map-container">
            <div ref={ref} className="map-container__map"></div>
        </div>
    );
};

export default Map;
