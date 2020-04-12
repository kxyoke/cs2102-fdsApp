import React, {useState}from 'react';

export default function CartButton () {
    const [navigate, setNavigate] = useState(false);

    function cart(e) {
        e.preventDefault();
        console.log('cart')
            // axios.post('/logout').then(res=> {
            //     if(res.status === 200) {
            //         alert("logout successfully");
            //        setNavigate(true);
            //     }
            // })
    }

    return (
        <div>
            <a href="/customer/cart" type="button" style={{display:"flex",float:'right'}} class="btn btn-warning">cart</a>
        </div>
        
        
    )
}