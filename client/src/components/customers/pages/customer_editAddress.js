import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Form,Button, FormGroup,FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
export default function CustomerEditAddress(props) {
    const [address, setAddress] = useState('');
    const {oldAddress} = props.location.state;
    useState(()=> {
        if(oldAddress !== undefined) {
            setAddress(oldAddress);
        } else {
            props.history.goBack();
        }
    })

    function validateForm() {
        return address.length>0 && oldAddress !== address;
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/customer/address', {oldAddress:oldAddress, newAddress:address})
            .then(res=> {
                if(res.status!==200) {
                alert(res.data);
                setAddress(oldAddress);
                }else {
                    alert("update successfully");
                    props.history.goBack();
                }
            }).catch (err=> {
                if(err.response.status === 409) {
                    
                    alert(err.response.data);
                    setAddress(oldAddress);

                }
            })
      }

    function deleteAddress(event) {
        axios.post("/api/customer/address/delete", {address:oldAddress})
            .then(res=> {
                alert(res.data);
                props.history.goBack();
            })
            .catch(err=> {
                console.err(err.response);
            })
          
      }

      function deleteBox() {
          confirmAlert({
              title:'Confirm to delete ',
              message: `Are you sure to delete ${oldAddress}?`,
              buttons:[
                  {label:'Yes',
                    onClick:()=> {deleteAddress();
                    }},
                {label: 'No',
            }
              ]
          })
      }

    return (
        
        <div className="SignUp">
          <Form onSubmit={handleSubmit}>
              <form>
                <div>
                <FormGroup controlId="address" bsSize="large">
                <ControlLabel>address</ControlLabel>
                  <FormControl
                    value={address}
                    onChange={e => {
                    setAddress(e.target.value)}}
                    type="address"
                />
                </FormGroup>
                </div>
              </form>
              <div className="well" style={wellStyles}>
            
              <Button block bsStyle="success" disabled={!validateForm()} type="submit">
                Edit
              </Button>
            </div>
          </Form>
          <div className="well" style={wellStyles}>
          <Button block bsStyle="danger" onClick={deleteBox}>
                Delete
              </Button>
              </div>
           
        </div>
       
       
    )

}

const wellStyles = { maxWidth: 300, margin: '0 auto 10px' };
