import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default function WithoutAuth(ComponentToProtect) {

    return class extends Component {
        constructor() {
            super();
            this.state={
                loading:true,
                redirect:false,
                identity:''
            };
        }

    componentDidMount() {
      axios.get('/notAuth')
            .then(res => {
              if(res.status === 200) {
                this.setState({loading: false});
              }
            })
            .catch(err => {
              console.error(err.response.data);
              this.setState({loading:false, redirect:true, identity:'/'+err.response.data});
            });
          }
          render() {
              const{loading, redirect, identity} = this.state;

            if(loading) {
              return null;
            }
            if(redirect) {
              console.log(identity)
            
              return <Redirect to={identity}/>
            }
            return <ComponentToProtect {...this.props}/>
        }
    }
}
