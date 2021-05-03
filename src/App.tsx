import React, {FormEvent, useState} from 'react';

import {LatLng} from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import {useFetch} from "./hooks/useFetch";

import './App.css';

interface Residence {
    externalId: string;
    number: number;
    zipCode: string,
    residents: number;
    latitude: number;
    longitude: number;
}

const initialPosition: LatLng = new LatLng(-22.894130, -43.287330)

function App() {

    const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8080/residences';

    const [location] = useState<LatLng>(initialPosition);

    const [houseNumber, setHouseNumber] = useState("");

    const [zipCode, setZipCode] = useState("");

    const [numberResidents, setNumberResidents] = useState("");

    const [latitude, setLatitude] = useState("");

    const [longitude, setLongitude] = useState("");

    const {data, error} = useFetch<Residence[]>(url);

    const residences: Residence[] = data && !error ? data : [];

  /*  function LocationMarker() {
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setLatitude(String(e.latlng.lat))
                setLongitude(String(e.latlng.lng))
                setLocation(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return location === null ? null : (
            <Marker position={location}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }*/

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!houseNumber || !zipCode || !numberResidents || !latitude || !longitude ) return;

        console.log(event);

        const residence: Residence = {
            externalId: '',
            number: Number(houseNumber),
            zipCode: zipCode,
            residents: Number(numberResidents),
            latitude: Number(latitude),
            longitude: Number(longitude)
        }

        console.log(residence);

        await fetch(url, {
            method: "POST",
            body: JSON.stringify(residence),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        });

        setHouseNumber("");
        setZipCode("");
        setNumberResidents("");
        setLatitude("");
        setLongitude("");
    }

    return (
        <div id="page-map">

        <form onSubmit={handleSubmit}  className="landing-page-form">
            <fieldset>
                <legend>Residence</legend>

                <div className="input-block">
                    <label htmlFor="name">House Number</label>
                    <input
                        id="houseNumber"
                        placeholder="house number"
                        value={houseNumber}
                        onChange={(event) => setHouseNumber(event.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="complement">Zip Code</label>
                    <input
                        placeholder="zip Code"
                        id="zipCode"
                        value={zipCode}
                        onChange={(event) => setZipCode(event.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="complement">Number of residents</label>
                    <input
                        placeholder="number of residents"
                        id="numberResidents"
                        value={numberResidents}
                        onChange={(event) => setNumberResidents(event.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="complement">Latitude</label>
                    <input
                        placeholder="latitude"
                        id="latitude"
                        value={latitude}
                        onChange={(event) => setLatitude(event.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="complement">Longitude</label>
                    <input
                        placeholder="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={(event) => setLongitude(event.target.value)}
                    />
                </div>

            </fieldset>

            <button className="confirm-button" type="submit">
                Confirm
            </button>
        </form>

        <MapContainer center={location} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/*<LocationMarker />*/}

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
        </div>
    );
}

export default App;
