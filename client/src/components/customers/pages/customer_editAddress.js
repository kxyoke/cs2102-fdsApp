import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Form,Button, FormGroup,FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
export default function CustomerEditAddress(props) {
    const [address, setAddress] = useState('');
    const {oldAddress, action} = props.location.state;
    const [isUpdate, setIsUpdate] = useState(true);
    useState(()=> {
        if(oldAddress !== undefined && action === 'update') {
            setAddress(oldAddress);
        }else if(oldAddress !== undefined && action === 'add') {
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
                return address.length>0 && oldAddress !== address.trim();
        }
        
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/customer/address', {oldAddress:oldAddress, newAddress:address.trim()})
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
