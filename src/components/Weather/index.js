import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { yw_ptbr, code_parser } from '../../components/Parser';
import axios from 'axios';

export default function Weather() {

    const [actualTemperature, setActualTemperature] = useState({
        temperature: [],
        text: [],
        wind: [],
        humidity: [],
        pressure: [],
        code: []
    });

    const [tomorrow, setTomorrow] = useState({
        min: [],
        max: [],
        day: [],
        text: [],
        code: []
    })

    const [afterTomorrow, setAfterTomorrow] = useState({
        min: [],
        max: [],
        day: [],
        text: [],
        code: []
    })

    const [location, setLocation] = useState('fortaleza, ce')

    var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
    var method = 'GET';
    var app_id = 'KtmgE9CQ';
    var consumer_key = 'dj0yJmk9cEh1U3VVT3FEYkNzJmQ9WVdrOVMzUnRaMFU1UTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PThl';
    var consumer_secret = 'fbddac2802fbdbf8bcca29d9fd35f43a105da625';
    var concat = '&';
    var query = { 'location': location, 'format': 'json', 'u': 'c' };
    var oauth = {
        'oauth_consumer_key': consumer_key,
        'oauth_nonce': Math.random().toString(36).substring(2),
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
        'oauth_version': '1.0'
    };

    var merged = { ...query, ...oauth };
    var merged_arr = Object.keys(merged).sort().map(function (k) {
        return [k + '=' + encodeURIComponent(merged[k])];
    });
    var signature_base_str = method
        + concat + encodeURIComponent(url)
        + concat + encodeURIComponent(merged_arr.join(concat));

    var composite_key = encodeURIComponent(consumer_secret) + concat;
    var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
    var signature = hash.toString(CryptoJS.enc.Base64);

    oauth['oauth_signature'] = signature;
    var auth_header = 'OAuth ' + Object.keys(oauth).map(function (k) {
        return [k + '="' + oauth[k] + '"'];
    }).join(',');

    useEffect(async () => {
        await loadWeather()
    }, []);

    async function loadWeather() {
        const response = await axios.get(url, {
            params: {
                ...query
            },
            headers: {
                'Authorization': auth_header,
                'X-Yahoo-App-Id': app_id
            },
        })
        setActualTemperature({
            temperature: response.data.current_observation.condition.temperature,
            text: response.data.current_observation.condition.text,
            wind: response.data.current_observation.wind.speed,
            humidity: response.data.current_observation.atmosphere.humidity,
            pressure: response.data.current_observation.atmosphere.pressure,
            code: response.data.current_observation.condition.code
        });
        setTomorrow({
            low: response.data.forecasts[1].low,
            high: response.data.forecasts[1].high,
            day: response.data.forecasts[1].day,
            text: response.data.forecasts[1].text,
            code: response.data.forecasts[1].code
        });
        setAfterTomorrow({
            low: response.data.forecasts[2].low,
            high: response.data.forecasts[2].high,
            day: response.data.forecasts[2].day,
            text: response.data.forecasts[2].text,
            code: response.data.forecasts[2].code
        });
        console.log(response)
    }

    return (
        <>
            <input type="text" onKeyDown={e => e.keyCode === 13 && loadWeather()} onChange={e => setLocation({ location: `${e.target.value}` }) & console.log(location)} />

            <div className="today">
                <img src={`assets/SVG/${code_parser[actualTemperature.code + ""]}.svg`} alt="" />
                <div className="content">
                    <h1>Now: {actualTemperature.temperature}°C</h1>
                    <h2>{yw_ptbr[actualTemperature.code + ""]}</h2>
                    <p><b>Vento: {actualTemperature.wind}km/h</b></p>
                    <p><b>Humidade: {actualTemperature.humidity}%</b></p>
                    <p><b>Pressão: {actualTemperature.pressure}hPA</b></p>
                </div>
            </div>

            <div className="after-today">
                <img src={`assets/SVG/${code_parser[tomorrow.code + ""]}.svg`} alt="" />
                <div className="content">
                    <h2>{tomorrow.day}</h2>
                    <p><b>{yw_ptbr[tomorrow.code + ""]}</b></p>
                    <p><b>High: {tomorrow.high}°C</b></p>
                    <p><b>Low: {tomorrow.low}°C</b></p>
                </div>
            </div>

            <div className="after-today">
                <img src={`assets/SVG/${code_parser[afterTomorrow.code + ""]}.svg`} alt="" />
                <div className="content">
                    <h2>{afterTomorrow.day}</h2>
                    <p><b>{yw_ptbr[afterTomorrow.code + ""]}</b></p>
                    <p><b>High: {afterTomorrow.high}°C</b></p>
                    <p><b>Low: {afterTomorrow.low}°C</b></p>
                </div>
            </div>
        </>
    )
}