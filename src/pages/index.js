import React, { useState, useEffect } from 'react';

import './styles.css';

import Loader from '../components/loader';
import LoadBackground from '../components/Background';
import Weather from '../components/Weather';

export default function Temperature() {

    const [loading, setLoading] = useState(true)

    const [location, setLocation] = useState('')

    useEffect(async () => {
        await geoLocation()
        setLoading(false)
    }, []);

    async function geoLocation() {
        await navigator.geolocation.getCurrentPosition(showPosition)
    }

    async function showPosition(position) {
        setLocation(position.coords)
        console.log(location)
    }

    const content = (<div className="App">
        <LoadBackground />

        <div className="container">

            <input type="text" onChange={e => setLocation({ location: e.target.value })} />

            <Weather />

        </div>
    </div>)


    return (
        (loading ? <Loader /> : content)
    );
}