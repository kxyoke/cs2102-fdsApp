import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Form,Button, FormGroup,FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

export default function CustomerEditAddress(props) {
    const [address, setAddress] = useState('');
    const [postal, setPostal] = useState('');
    const {oldAddress, oldPostal, action} = props.location.state;
    const [isUpdate, setIsUpdate] = useState(true);
    var postalReg = new RegExp('^\\d{6}$');

    useState(()=> {
        if(oldAddress !== undefined && action === 'update') {
            console.log(oldAddress);
            setAddress(oldAddress);
            setPostal(oldPostal);
        }else if(oldAddress !== undefined && action === 'add') {
            console.log(oldAddress);
            setIsUpdate(false);
        } else {
            props.history.goBack();
        }
    })

    function validateForm() {
        switch (action) {
            case "add":
                return address.length>0; 
            default :
                return address.length>0 && (oldAddress !== address.trim() || oldPostal !== postal) && postalReg.test(postal);
        }
        
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/customer/address', {oldAddress:oldAddress, newAddress:address.trim(), newPostal:postal})
            .then(res=> {
                if(res.status!==200) {
                    alert(res.data);
                    if(oldAddress === null) {
                        
                    } else {
                        setAddress(oldAddress);
                    }
                }else {
                    alert("update successfully");
                    props.history.goBack();
                }
            }).catch (err=> {
                if(err.response.status === 409) {
                    alert(err.response.data);
                    if(oldAddress === null || action === "add") {
                        setAddress('')
                    }else {
                        setAddress(oldAddress);
                        setPostal(oldPostal);
                    }
                    
                    

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
              
                <div>
                <FormGroup controlId="address" bsSize="large">
                {isUpdate? 
                    <ControlLabel>Edit Address :</ControlLabel>
                :
                    <ControlLabel>Add New Address :</ControlLabel>
                }
                
                  <FormControl
                    value={address}
                    onChange={e => {
                    setAddress(e.target.value)}}
                    type="address"
                />
                <ControlLabel>Postal code :</ControlLabel>
                <FormControl
                    value={postal}
                    onChange={e => {
                    setPostal(e.target.value)}}
                    type="postal"
                />
                </FormGroup>
                </div>
              
              <div className="well" style={wellStyles}>
            {isUpdate?
              <Button block bsStyle="success" disabled={!validateForm()} type="submit">
                Edit
              </Button>
              : 
              <Button block bsStyle="success" disabled={!validateForm()} type="submit">
                Add
              </Button>
            }
            </div>
          </Form>
          {isUpdate? 
            <div className="well" style={wellStyles}>
                <Button block bsStyle="danger" onClick={deleteBox}>
                    Delete
                </Button>
            </div>
            : null}
           
        </div>
       
       
    )

}

const wellStyles = { maxWidth: 300, margin: '0 auto 10px' };
