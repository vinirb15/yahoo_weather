import React, { Component } from 'react';
import $ from 'jquery';
import CryptoJS from 'crypto-js';

import './styles.css';

import bing from '../services/bing';
import Loader from '../components/loader';

export default class Main extends Component {
    state = {
        actualTemperature: [
            {
                temperature: [],
                text: [],
                wind: [],
                humidity: [],
                pressure: [],
                code: []
            }
        ],
        tomorrow: [
            {
                min: [],
                max: [],
                day: [],
                text: [],
                code: []
            }
        ],
        afterTomorrow: [
            {
                min: [],
                max: [],
                day: [],
                text: [],
                code: []
            }
        ],
        temperature: [],
        background: [],
        loading: []
    }



    componentDidMount() {
        this.loadBackground();
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

        var merged = {};
        $.extend(merged, query, oauth);
        // Note the sorting here is required
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

        $.ajax({
            url: url + '?' + $.param(query),
            headers: {
                'Authorization': auth_header,
                'X-Yahoo-App-Id': app_id
            },
            method: 'GET',
            success: (value) => {
                this.setState({
                    temperature: value,
                    actualTemperature: {
                        temperature: value.current_observation.condition.temperature,
                        text: value.current_observation.condition.text,
                        wind: value.current_observation.wind.speed,
                        humidity: value.current_observation.atmosphere.humidity,
                        pressure: value.current_observation.atmosphere.pressure,
                        code: value.current_observation.condition.code
                    },
                    tomorrow: {
                        low: value.forecasts[1].low,
                        high: value.forecasts[1].high,
                        day: value.forecasts[1].day,
                        text: value.forecasts[1].text,
                        code: value.forecasts[1].code
                    },
                    afterTomorrow: {
                        low: value.forecasts[2].low,
                        high: value.forecasts[2].high,
                        day: value.forecasts[2].day,
                        text: value.forecasts[2].text,
                        code: value.forecasts[2].code
                    }
                })
                console.log(value)
            }
        })
    }

    loadBackground = async () => {
        this.setState({ loadin: true })
        const response = await bing.get()
        this.setState({
            background: response.data.images[0].url,
            loading: false
        })
    }
    render() {
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
            1: 13,
            2: 6,
            3: 13,
            4: 16,
            5: 15,
            6: 23,
            7: 39,
            8: 40,
            9: 20,
            10: 17,
            11: 20,
            12: 17,
            13: 18,
            14: 21,
            15: 21,
            16: 23,
            17: 21,
            18: 20,
            19: 20,
            20: 25,
            21: 13,
            22: 25,
            23: 13,
            24: 6,
            25: 6,
            26: 6,
            27: 13,
            28: 9,
            29: 8,
            30: 9,
            31: 8,
            32: 3,
            33: 2,
            34: 3,
            35: 2,
            36: 18,
            37: 43,
            38: 6,
            39: 6,
            40: 6,
            41: 17,
            42: 6,
            43: 21,
            44: 6,
            45: 14,
            46: 26,
            47: 22,
            48: 15,
            49: 13
        }

        const content = (<div className="App">
            <img className="background" src={`https://www.bing.com/${this.state.background}`} alt="background" />

            <div className="container">

                <input type="text" />

                <div className="today">
                    <img src={`assets/SVG/${code_parser[this.state.actualTemperature.code + ""]}.svg`} alt="" />
                    <div className="content">
                        <h1>Now: {this.state.actualTemperature.temperature}°C</h1>
                        <h2>{yw_ptbr[this.state.actualTemperature.code + ""]}</h2>
                        <p><b>Vento: {this.state.actualTemperature.wind}km/h</b></p>
                        <p><b>Humidade: {this.state.actualTemperature.humidity}%</b></p>
                        <p><b>Pressão: {this.state.actualTemperature.pressure}hPA</b></p>
                    </div>
                </div>

                <div className="after-today">
                    <img src={`assets/SVG/${code_parser[this.state.tomorrow.code + ""]}.svg`} alt="" />
                    <div className="content">
                        <h2>{this.state.tomorrow.day}</h2>
                        <p><b>{this.state.tomorrow.text}</b></p>
                        <p><b>High: {this.state.tomorrow.high}°C</b></p>
                        <p><b>Low: {this.state.tomorrow.low}°C</b></p>
                    </div>
                </div>



                <div className="after-today">
                    <img src={`assets/SVG/${code_parser[this.state.afterTomorrow.code + ""]}.svg`} alt="" />
                    <div className="content">
                        <h2>{this.state.afterTomorrow.day}</h2>
                        <p><b>{this.state.afterTomorrow.text}</b></p>
                        <p><b>High: {this.state.afterTomorrow.high}°C</b></p>
                        <p><b>Low: {this.state.afterTomorrow.low}°C</b></p>
                    </div>
                </div>


            </div>

        </div>)

        const { loading } = this.state;

        return (
            (loading ? <Loader /> : content)
        );
    }
}