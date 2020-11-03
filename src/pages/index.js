import React, { Component } from 'react';
import $ from 'jquery';
import CryptoJS from 'crypto-js';

import './styles.css';

import bing from '../services/bing';
import api from '../services/api';

import Image from '../assets/SVG/31.svg';


export default class Main extends Component {
    state = {
        temperature: [],
        background: []
    }


    componentDidMount() {
        this.loadBackground();


        var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
        var method = 'GET';
        var app_id = 'KtmgE9CQ';
        var consumer_key = 'dj0yJmk9cEh1U3VVT3FEYkNzJmQ9WVdrOVMzUnRaMFU1UTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PThl';
        var consumer_secret = 'fbddac2802fbdbf8bcca29d9fd35f43a105da625';
        var concat = '&';
        var query = { 'location': 'sunnyvale,ca', 'format': 'json' };
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
            success: function (data) {
                console.log(data);
            }
        })
    }

    loadBackground = async () => {
        const response = await bing.get()
        this.setState({ background: response.data.images[0].url })
    }

    render() {
        return (
            <div className="App">
                <img className="background" src={`https://www.bing.com/${this.state.background}`} alt="background" />

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
}