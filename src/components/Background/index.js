import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function LoadBackground() {
    const [background, setBackground] = useState('')

    useEffect(async () => {
        const response = await axios.get('http://localhost:8000/image')
        setBackground(response.data.images[0].url)
        console.log(response)
    }, []);
    

    return (
            <img className="background" src={`https://www.bing.com/${background}`} alt="background" />
    )
}