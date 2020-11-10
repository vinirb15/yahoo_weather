import React, { useState, useEffect } from 'react'

export default function GeoLocation() {

    const [location, setLocation] = useState('')

    useEffect(async () => {
        await geoLocation()
    }, []);

    async function geoLocation() {
        await navigator.geolocation.getCurrentPosition(showPosition)
    }

    async function showPosition(position) {
        setLocation(position.coords)
        console.log(location)
    }

    return(
        <input type="text" onChange={e => setLocation({ location: e.target.value }) & console.log(location)} />
    )
}