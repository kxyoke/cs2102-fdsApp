import React, { Component } from 'react'
import PropTypes from 'prop-types';

class SearchBar extends Component {
    state = {
        input:''
    }
    onChange=(e)=>{
        this.setState(
        { [e.target.name]: e.target.value});
        this.props.search(e.target.value);
        }
        
    // valid=()=> {
    //     return this.state.input.length>0;
    // }

    render() {
        return (
            <React.Fragment>
            <p> </p>
            <div class='container'>
            <div style= {{display: 'flex' }}>
                <input
                type ='text'
                name ='input'
                style = {{flex:'10', padding:'5px'}}
                placeholder='Search....'
                value={this.state.title}
                onChange={this.onChange}
                />
                <input
                type='submit'
                value='search'
                className='btn'
                style={{flex:'1', border:'solid'}}
                // disabled={!this.valid()}
                onClick={this.props.search.bind(this, this.state.input)}
                />
                </div>
            </div>
            </React.Fragment>
            
        )
    }
} 

SearchBar.propTypes= {
    search:PropTypes.func.isRequired
};

export default SearchBar

