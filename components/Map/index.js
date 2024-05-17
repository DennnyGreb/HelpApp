'use client';

import React, {useEffect, useState, useMemo} from 'react';
import Modal from 'react-modal';
import 'leaflet/dist/leaflet.css';
import * as ReactLeaflet from "react-leaflet";
import styles from "@/app/page.module.scss";
import axios from "axios";
import Links from "@/components/Map/Links";
const { MapContainer, TileLayer, Marker, Popup, useMapEvents } = ReactLeaflet;

const DEFAULT_CENTER = [50.619900, 26.251617];
const zoom = 13;
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        opacity: '1',
        zIndex: '10',
        width: '500px',
        height: '200px',
    },

};

const LocationMarkers = () => {
    const [markers, setMarkers] = useState((typeof window !== 'undefined' && window.localStorage.getItem('markers')) ? JSON.parse(window.localStorage.getItem('markers')) : []);
    const map = useMapEvents({
        click(e) {
            const text = prompt();
            const newOne = {latlang: e.latlng, text: text};
            markers.push();
            setMarkers((prevValue) => [...prevValue, newOne]);
        }
    });
    console.log(markers);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('markers')) {
            setMarkers(JSON.parse(window.localStorage.getItem('markers')));
        }
    }, []);

    useEffect(() => {
        console.log(markers);
        if (markers && typeof window !== 'undefined') {
            window.localStorage.setItem('markers', JSON.stringify(markers));
        }
    }, [markers]);

    return (
        <React.Fragment>
            {markers?.map(marker => <Marker key={marker?.latlang} position={marker?.latlang} ><Popup>
                {marker.text}
            </Popup></Marker>)}
        </React.Fragment>
    );
};

const Map = () => {
    const [map, setMap] = useState(null);
    const [currentCity, setCurrentCity] = useState(DEFAULT_CENTER);
    const [cityName, setCityName] = useState('');
    const [modal, setModal] = useState(null);

    useEffect(() => {
        Modal.setAppElement('#modal');
    }, [map]);

    const addMarker = (e) => {
        console.log(addMarker);
    }

    const displayMap = useMemo(
        () => (
            <MapContainer onClick={addMarker} ref={setMap} center={currentCity} width="800" height="800" zoom={13} scrollWheelZoom={false} whenCreated={setMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/*                    <Marker position={currentCity}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>*/}
                <LocationMarkers />
            </MapContainer>
        ),
        [],
    );

    return (
        <>
            <Modal
                isOpen={modal}
                onRequestClose={() => setModal(null)}
                style={customStyles}
                contentLabel="Example Modal"
                className={styles.content}
            >
                {
                    modal === 'city' && (
                        <div>
                            <div className={styles.heading}>
                                <h2>Змінити місто</h2>
                                <button onClick={() => setModal(null)}>X</button>
                            </div>
                            <div className={styles.cityForm}>
                                <input onChange={(e) => {setCityName(e.target.value)}} value={cityName} className={styles.input} type='text' />
                                <button onClick={async (e) => {
                                    e.preventDefault();
                                    const result = await axios.get('https://api.api-ninjas.com/v1/city?name=' + cityName, { headers: {'X-Api-Key': '1lyV99H7UDkbxG4lPOttzw==h8dTFIHVD7LULcNq'}});
                                    console.log(result);
                                    if (result?.data[0]) {
                                        const city = [result?.data[0]?.latitude, result?.data[0]?.longitude];
                                        setCurrentCity(city);
                                        map?.setView(city, zoom);
                                    } else {
                                        alert('Incorrect city name');
                                    }
                                    setModal(null);
                                }} className={styles.button}>Змінити місто</button>
                            </div>
                        </div>
                    )
                }
                {
                    modal === 'contacts' && (
                        <div>
                            <div className={styles.heading}>
                                <h2>Contacts</h2>
                                <button onClick={() => setModal(null)}>X</button>
                            </div>
                            <h3>Адміністратор сайту: +380 97 23 34 344</h3>
                            <h3>Команда розробників: +380 95 23 23 311</h3>
                        </div>
                    )
                }
            </Modal>
            <div className={styles.center}>
                {displayMap}
            </div>
            <Links setModal={setModal}/>
        </>
    );
}

export default Map;
