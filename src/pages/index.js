import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

import './styles.css';

import bing from '../services/bing';
import Loader from '../components/loader';

export default function Temperature() {
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

    const [background, setBackground] = useState('')

    const [loading, setLoading] = useState(true)

    const [location, setLocation] = useState('')

    var yw_ptbr = {
        '0': 'tornado',
        '1': 'tempestade tropical',
        '2': 'furacão',
        '3': 'tempestade severa',
        '4': 'trovoadas',
        '5': 'chuva e neve',
        '6': 'chuva e granizo fino',
        '7': 'neve e granizo fino',
        '8': 'garoa gélida',
        '9': 'garoa',
        '10': 'chuva gélida',
        '11': 'chuvisco',
        '12': 'chuva',
        '13': 'neve em flocos finos',
        '14': 'leve precipitação de neve',
        '15': 'ventos com neve',
        '16': 'neve',
        '17': 'chuva de granizo',
        '18': 'pouco granizo',
        '19': 'pó em suspensão',
        '20': 'neblina',
        '21': 'névoa seca',
        '22': 'enfumaçado',
        '23': 'vendaval',
        '24': 'ventando',
        '25': 'frio',
        '26': 'nublado',
        '27': 'muitas nuvens (noite)',
        '28': 'muitas nuvens (dia)',
        '29': 'parcialmente nublado (noite)',
        '30': 'parcialmente nublado (dia)',
        '31': 'céu limpo (noite)',
        '32': 'ensolarado',
        '33': 'tempo bom (noite)',
        '34': 'tempo bom (dia)',
        '35': 'chuva e granizo',
        '36': 'quente',
        '37': 'tempestades isoladas',
        '38': 'tempestades esparsas',
        '39': 'tempestades esparsas',
        '40': 'chuvas esparsas',
        '41': 'nevasca',
        '42': 'tempestades de neve esparsas',
        '43': 'nevasca',
        '44': 'parcialmente nublado',
        '45': 'chuva com trovoadas',
        '46': 'tempestade de neve',
        '47': 'relâmpagos e chuvas isoladas',
        '3200': 'não disponível'
    }

    var code_parser = {
        0: 45,
        1: 13,
        2: 13,
        3: 6,
        4: 16,
        5: 23,
        6: 23,
        7: 23,
        8: 20,
        9: 17,
        10: 20,
        11: 17,
        12: 18,
        13: 24,
        14: 24,
        15: 21,
        16: 23,
        17: 20,
        18: 20,
        19: 20,
        20: 25,
        21: 13,
        22: 25,
        23: 6,
        24: 6,
        25: 6,
        26: 25,
        27: 9,
        28: 8,
        29: 9,
        30: 8,
        31: 3,
        32: 2,
        33: 3,
        34: 2,
        35: 24,
        36: 2,
        37: 26,
        38: 26,
        39: 26,
        40: 17,
        41: 21,
        42: 21,
        43: 21,
        44: 14,
        45: 26,
        46: 22,
        47: 15,
        48: 45,
        49: 45
    }



    var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
    var method = 'GET';
    var app_id = 'KtmgE9CQ';
    var consumer_key = 'dj0yJmk9cEh1U3VVT3FEYkNzJmQ9WVdrOVMzUnRaMFU1UTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PThl';
    var consumer_secret = 'fbddac2802fbdbf8bcca29d9fd35f43a105da625';
    var concat = '&';
    var query = { 'location': 'fortaleza,ce', 'format': 'json', 'u': 'c' };
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
        geoLocation()
        loadBackground()
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
        setLoading(false)
    }

    async function geoLocation() {
        await navigator.geolocation.getCurrentPosition(showPosition)
    }

    async function showPosition(position) {
        setLocation(position.coords)
        console.log(location)
    }



    async function loadBackground() {
        const response = await bing.get()
        setBackground(response.data.images[0].url)
    }


    const content = (<div className="App">
        <img className="background" src={`https://www.bing.com/${background}`} alt="background" />

        <div className="container">

            <input type="text" onChange={e => setLocation({ location: e.target.value })} />

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


        </div>

    </div>)


    return (
        (loading ? <Loader /> : content)
    );
}