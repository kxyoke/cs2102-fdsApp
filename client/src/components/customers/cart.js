import {useReducer, useState, useEffect} from 'react';
import axios from 'axios';

const reduceCartFromOrders= (current, [id, quantity]) => {
    if(current === null) current={};

    if(quantity=== null) {
        delete current[id];
        return current;
    }

const currentQuantity = current[id] || 0;
const newQuantity = Math.max(currentQuantity+quantity, 0);

return {
    ...current,
    [id]: newQuantity
};
};

export function useShoppingCart() {
    const [cart, processOrder] = useReducer(
        reduceCartFromOrders,
        null
    );

    const addItem = id => processOrder([id, 1]);
    const subtractItem = id => processOrder([id, -1]);
    const removeItem = id=>processOrder([id, null]);

    const [error, setError] = useState(null);
    const [save, setSaved] = useState(false);

    useEffect(() => {
    
            axios.get('/api/customer/cart')
                    .then(res => {
                        console.log(res);
                        // res.data.json()})
                    // .then(
                    //     initialCart=>
                    //     Object.keys(initialCart).forEach(id =>
                    //         processOrder([id, initialCart[id]]))
                    // ).catch(error=> {
                    //     setError(error.toString());
                    });
        
    }, []);

    useEffect(()=> {
        if(cart !== null) {
            setSaved(false);
            axios.post('/api/customer/cart', cart, {
                headers: {
                    "Content-Type" : "application/json",
                }
            }).then(() => {
                setSaved(true);
                setError(null);
            }).catch(error=> {
                setSaved(false);
                setError(error.toString());
            });
        }
    },[cart]);

    return {
        cart,
        error,
        save,
        processOrder,
        addItem,
        subtractItem,
        removeItem
    };
}


