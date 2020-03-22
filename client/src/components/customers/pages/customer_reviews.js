import React, { Component } from 'react'
import Header from '../layout/header'

export default class CReviews extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div className="MyReviews">
                <ul>
                    <h4>Past reviews 1...</h4>
                    <h4>Past reviews 2...</h4>
                    <h4>Past reviews 3...</h4>
                    <h4>Past reviews 4...</h4>
                    <h4>Past reviews 5...</h4>
                </ul>
            </div>
            </div>
        )
    }
}