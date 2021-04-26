import React from 'react';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import {useFetch} from "./hooks/useFetch";

import './App.css';

interface Residence {
    externalId: string;
    number: number;
    residents: number;
    latitude: number;
    longitude: number;
}

function App() {

    const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8080/residences';

    const {data, error} = useFetch<Residence[]>(url);

    const residences: Residence[] = data && !error ? data : [];

    return (
        <MapContainer center={[-22.894190216614863, -43.28774929084236]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {residences.map(residence => (
                <Marker
                    key={residence.externalId}
                    position={[residence.latitude, residence.longitude]}
                >
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    );
}

export default App;
