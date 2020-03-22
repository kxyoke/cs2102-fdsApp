import React, { Component } from 'react'
import Header from '../layout/header'

export default class COrder extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div className="MyOrders">
                <ul>
                    <h4>Past Order 1...</h4>
                    <h4>Past Order 2...</h4>
                    <h4>Past Order 3...</h4>
                    <h4>Past Order 4...</h4>
                    <h4>Past Order 5...</h4>
                </ul>
            </div>
            </div>
        )
    }
}