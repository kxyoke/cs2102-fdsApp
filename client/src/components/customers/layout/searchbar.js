import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        input:''
    }
    onChange=(e)=>{
        console.log(e.target.name)
        this.setState(
        { [e.target.name]: e.target.value})
        }

    render() {
        return (
            <form style= {{display: 'flex' }}>
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
                style={{flex:'1'}}
                />
            </form>
        )
    }
} 

export default SearchBar

