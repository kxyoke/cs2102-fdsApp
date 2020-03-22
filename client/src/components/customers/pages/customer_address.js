import React, { Component } from 'react'
import Header from '../layout/header'

export default class CAddress extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div className="MyAddress">
                <ul>
                    <h4>Address 1...</h4>
                    <h4>Address 2...</h4>
                    <h4>Address 3...</h4>
                    <h4>Address 4...</h4>
                </ul>
            </div>
            </div>
        )
    }
}