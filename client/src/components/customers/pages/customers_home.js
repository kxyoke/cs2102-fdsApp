import React, { Component } from 'react'
import Header from '../layout/header'
import SearchBar from '../layout/searchbar'

class CHome extends Component {

    render() {
        return (
            <div className="Home">
            <Header/>
            <SearchBar/>
            <div className="Restarants">
                <ul>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                    <h4>Restaurant...</h4>
                </ul>
            </div>
            </div>
        )
    }
}

export default CHome