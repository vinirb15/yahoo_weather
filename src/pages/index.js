import React, { useState, useEffect } from 'react';

import './styles.css';

import bing from '../services/api'

import Image from '../assets/SVG/31.svg';

export default function Temp() {
    const [background, setBackground] = useState([]);


    useEffect(() => {
        bing.get().then(response => {
            setBackground(response.data.images[0].url);
        })
    }, []);

    console.log(background)
    return (
        <div className="App">
            <img className="background" src={`https://www.bing.com/${background}`} alt="" />

            <div className="container">

                <input type="text" />

                <div className="today">
                    <img src={Image} alt="" />
                    <div className="content">
                        <h1>hoje 23c</h1>
                        <h2>Parcialmente Nublado</h2>
                        <p>Vento: 9km/h</p>
                        <p>Humidade: 80%</p>
                        <p>Pressão: 1003hPA</p>
                    </div>
                </div>

                <div className="after-today">
                    <img src={Image} alt="" />
                    <div className="content">
                        <h1>hoje 23c</h1>
                        <h2>Parcialmente Nublado</h2>
                        <p>Vento: 9km/h</p>
                        <p>Humidade: 80%</p>
                        <p>Pressão: 1003hPA</p>
                    </div>
                </div>



                <div className="after-today">
                    <img src={Image} alt="" />
                    <div className="content">
                        <h1>hoje 23c</h1>
                        <h2>Parcialmente Nublado</h2>
                        <p>Vento: 9km/h</p>
                        <p>Humidade: 80%</p>
                        <p>Pressão: 1003hPA</p>
                    </div>
                </div>


            </div>

        </div>
    );
}