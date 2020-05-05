import React, {useState} from "react";
import {Button, Form, Modal, Rating} from 'semantic-ui-react';
import Axios from "axios";

export default function ReviewModal(props) {
    const {order_id, rname, update} = props;
    const [open, setOpen] = useState(false);
    const [foodReview, setFoodReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleOpen=()=> setOpen(true);
    const handleClose = ()=> setOpen(false);

    const handleRate =(e, {rating}) => {
        setRating(rating);
    }
    const valid = () => {
        return foodReview.length>0 && rating>0;
    }
    const handleSubmit=()=> {
        console.log(rating);
        console.log(foodReview);
        console.log("submit");
        //axios to post to backend for use coupon
        //the backend will handle the use of coupon
        //on success update the total price on the cart page;
        Axios.post('/api/customer/review', {order_id:order_id,
                                            food_rev:foodReview,
                                             delivery_rating:rating})
            .then(res=> {
                console.log(res.data);
                alert(res.data);
                //pending for debug
                const newReview = {
                    delivery_rating:rating,
                    food_rev:foodReview,
                    order_id:order_id,
                    rname:rname
                }
                update(order_id, newReview);
                handleClose()
        })
    }
    return (
        <div display='flex'>
            <Modal
                trigger={<Button onClick={handleOpen}>Make review</Button>}
                open={open}
                onClose={handleClose}
                size='tiny'
                centered='true'
                >
                    <Modal.Header>Use coupon</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Food review</label>
                            <Form.Input
                                placeholder="Give a review on the food"
                                name="foodReview"
                                value={foodReview}
                                onChange={(e)=>setFoodReview(e.target.value)}
                                />
                        </Form.Field>
                        <Form.Field>
                            <Rating maxRating={5} onRate={handleRate}/>
                        </Form.Field>
                        <Form.Button 
                            content="submit"
                            disabled ={!valid()}
                            >Submit</Form.Button>
                    </Form> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            negative
                            onClick ={handleClose}
                            >Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>

    )
    
}


