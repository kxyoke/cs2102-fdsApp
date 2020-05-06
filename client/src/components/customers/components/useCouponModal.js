import React, {useState, useEffect} from "react";
import {Button, Dropdown, Modal} from 'semantic-ui-react';
import Axios from "axios";
import Utils from '../../fds/components/utils/utils'


export default function CouponModal(props) {
    const [open, setOpen] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [couponOptions, setCouponOptions] = useState([]);
    const [des, setDes] = useState('');
    const handleOpen=()=> setOpen(true);
    const handleClose = ()=> setOpen(false);

    useEffect(() => {
        const fetchData = async ()=> {
                await Axios.get('/api/customer/usableCoupon')
                            .then(res=> {
                                processCoupon(res.data);

                            })
        }

        fetchData();
    }, [])

    function processCoupon(coupons) {
        coupons.forEach(coupon=> {
            console.log(coupon);
            const d = Utils.fdsCouponParser(coupon.description);
            const s = Utils.getCouponDesc(d.couponType, d.discountType, d.discountValue);
            coupon.text = s;
            coupon.value = {
                coupon_id:coupon.coupon_id,
                detail :d
            }
            coupon.key=coupon.coupon_id;
            delete coupon.description;
        })

        setCouponOptions(coupons);
        
        
    }
    const handleChange =(e, data) => {
        setDes(data.text);
        setCoupon(data.value);
        
    }
    
    return (
        <Modal
            trigger={<Button onClick={handleOpen}>Use Coupon</Button>}
            open={open}
            onClose={handleClose}
            size='large'
            >
                <Modal.Header>Use coupon</Modal.Header>
                <Modal.Content>
                   <Dropdown
                       placeholder="Choose a coupon to use"
                       selection
                       fluid
                       scrolling
                       value={des}
                       options={couponOptions}
                       onChange={handleChange}
                       >
                      
                   </Dropdown>

                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        color='green'
                        disabled={coupon===null}
                        onClick ={()=> {
                            props.useCoupon(coupon);
                            handleClose()
                        }}
                        >Apply</Button>
                    <Button 
                        negative
                        onClick ={handleClose}
                        >Close</Button>
                </Modal.Actions>
            </Modal>

    )
    
}


