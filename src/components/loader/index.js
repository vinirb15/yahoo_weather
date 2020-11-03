import React, { Component } from 'react';

import './styles.css';

export default class Loader extends Component {
    render() {

        return (
            <div className="teste">
                <div className="lds-hourglass"></div>
            </div>
        );
    }
}