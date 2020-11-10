import React, { useState, useEffect } from 'react';

import './styles.css';

import Loader from '../components/loader';
import LoadBackground from '../components/Background';
import Weather from '../components/Weather';
// import GeoLocation from '../components/GeoLocation';

export default function Temperature() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, []);

    const content = (<div className="App">
        <LoadBackground />

        <div className="container">

            <Weather />

        </div>

    </div>)


    return (
        (loading ? <Loader /> : content)
    );
}