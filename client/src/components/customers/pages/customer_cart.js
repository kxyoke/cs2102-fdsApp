import React ,{useState, useEffect} from 'react';
import CartItem from "../components/cartItem";
import Header from '../layout/header';
import Axios from 'axios';
import PaymentButton from '../components/paymentModal'
import {Divider, Loader, Dropdown, Button} from 'semantic-ui-react';
import CouponModal from '../components/useCouponModal';
import Utils from '../../fds/components/utils/utils';
import Rutil from '../../restaurant_staff/components/utils/utils';
export default function CCart(props) {
    //general 
    const [loading, setLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(3);
    const [coupon, setCoupon] = useState('');
    const [cDiscount, setCDiscount] = useState(0);
    const [applied, setApplied] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [deliveryAddress, setDeliveryAddress]=useState('');
    const [payment, setPayment] = useState("card");
    const [card, setCard] = useState('');
    const [fdsPromotionDetail, setFdsPromotionDetail]=useState({promotype:"", discountType:"", discountValue:""});
    const [resPromotionDetail, setResPromotionDetail] = useState({minAmount:'', isAbs:'', discount:''});
    const [rewardPoints, setRewardPoints] = useState(0);
    const [rewardPointsUsed, setRewardPointsUsed] = useState(0);
    const [rd, setRd]=useState(0);
    const [fd,setFd] = useState(0);
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
        
    }
    function updateTotal(update) {
        const ct = subtotal + update;
        if(ct === 0 ) {
            setTotal(0);
            setSubtotal(0);
        } else {
            setSubtotal(roundToTwo(ct));
            setTotal(roundToTwo(ct+deliveryFee-cDiscount-fd-rd));
        }
    }
    function refreshTotal() {
        updateTotal(0)
    }
    async function getTotal(input) {
        var temp =0;
        await input.forEach(item=> {
                
            temp = roundToTwo(temp+(parseFloat(item.price)*item.qty));
        })
     
        
        setSubtotal(temp);
  
        setTotal(roundToTwo(temp+deliveryFee));
    }
    function redirectTOHomePage() {
        props.history.push('/customer');
    }

    useEffect(() => {
        const fetchData = async()=> {
            await Axios.all([
            Axios.get('/api/customer/cart'),
            Axios.get('/api/customer/address'),
            Axios.get('/api/customer/card'),
            Axios.get('/api/customer/promo/current'),
            Axios.get('/api/customer/rewardPoints')
            ])
            .then(Axios.spread((...res)=> {
                const res1 = res[0];
                const res2=res[1];
                const res3=res[2];
                const res4= res[3];
                const res5=res[4];
                console.log(res5.data[0].reward_points);
                setRewardPoints(res5.data[0].reward_points);
              
                if(res1.data !== 'empty') {
                    setCarts(res1.data);
                    setShow(true);
                    getTotal(res1.data);
                } else {
                    setShow(false)
                }
                
                setDeliveryAddress(res2.data[0].address);
                processAddress(res2.data);
                processPromotions(res4.data);
                setCard(res3.data.cardnumber);
                setLoading(false);

                
            })
            ).catch(err=> {
                console.log(err)
            })
        }
        fetchData();
       
    }, [])
    useEffect(() => {
        console.log('applying res promo');
        applyResPromo()
    }, [resPromotionDetail, subtotal])
    useEffect(() => {
        if (applied) {
            console.log('applying fds promo');
            applyFdsPromo()
        }
    }, [total])

    function processAddress(address) {
        address.forEach(add=> {
            add.text=add.address;
            add.value=add.address;
        })
        setAddresses(address);

    }
    function applyPromo() {
        applyFdsPromo()
    }
    function applyFdsPromo() {
        var fDiscount = 0;
        if(fdsPromotionDetail.discountValue !== "" ) {
           
            if(fdsPromotionDetail.promotype === 'delivery') {
                fDiscount=3;
            } else {
                if(fdsPromotionDetail.discountType ==='percent') {
                    fDiscount = roundToTwo(parseFloat(fdsPromotionDetail.discountValue)*total);
                    
                } else {
                    if( total < fdsPromotionDetail.discountValue) {

                    } else {
                        fDiscount= parseFloat(fdsPromotionDetail.discountValue);
                    }
                    
                }
            }
        }
        if(total < fDiscount) {
            fDiscount = 0;
        }
        setFd(fDiscount);
        setApplied(true);
    }
    function applyResPromo() {
        var rDiscount = 0;
        if(resPromotionDetail.discount!=='') {

            if( subtotal<parseFloat(resPromotionDetail.minAmount)) {
            } else {
                if(!resPromotionDetail.isAbs) {
                    rDiscount =roundToTwo(parseFloat(resPromotionDetail.discount)/100 * subtotal);
                    
                } else {
                    rDiscount= parseFloat(resPromotionDetail.discount);
                }
            }
            
        }
        if(subtotal < rDiscount) {
            rDiscount = 0;
        }
        setRd(rDiscount);
    }
    useEffect(() => {
        console.log('refreshing');console.log(subtotal)
        refreshTotal()
    }, [fd, rd, cDiscount, subtotal])

    function processPromotions(promotions) {
        var i;
        for(i = 0; i < promotions.length; i++) {
            if(promotions[i].promotype === 'FDS') {
               const fd= Utils.fdsPromoParser(promotions[i].description);
               if(fdsPromotionDetail.discountValue.length>0) {
                   if(fd.promoType==='delivery' && fdsPromotionDetail.promoType !== 'delivery') {
                        if(fdsPromotionDetail.discountType==='dollars') {
                            if(fdsPromotionDetail.discountValue < 3) {
                                setFdsPromotionDetail(fd);
                            }
                        } else {
                            if(fdsPromotionDetail.discountValue<50) {
                                setFdsPromotionDetail(fd)
                            }
                        }
                   } else if(fd.promoType!=='delivery' && fdsPromotionDetail.promoType === 'delivery') {
                        if(fd.discountType==='dollars') {
                            if(fd.discountValue> 3) {
                                setFdsPromotionDetail(fd);
                            }
                        } else {
                            if(fd.discountValue *total >=50) {
                                setFdsPromotionDetail(fd)
                            }
                        }  
                    }
                }else {
                   
                    setFdsPromotionDetail(fd);
                }
               
            } else {
                const rd = Rutil.getDefaultPromoDescProps(promotions[i].description);
                if(resPromotionDetail.discount.length>0) {

                    
                    if(rd.isAbs&&resPromotionDetail.isAbs) {
                        if(rd.minAmount < total&& resPromotionDetail.discount < rd.discount) {
                            setResPromotionDetail(rd);
                        }

                    } else if (rd.isAbs&& !resPromotionDetail.isAbs) {
                        if(rd.minAmount<total &&
                            rd.discount >= 50) {

                            setResPromotionDetail(rd);
                        }
                    }
                } else {
                    setResPromotionDetail(rd);
                }
            }
        }
        if(i >0) {
            setApplied(false);
        }

    }
   
    

    function back(e) {
        if(carts.length>0) {
       
        props.history.push({pathname:"/customer/resMenu",
        state:{res_id:carts[0].res_id, rname:carts[0].rname}});
        } else {

            props.history.push('/customer');
        }
    }
    //one order can only use 1 coupon
    function useCoupon(cp) {
            
     
            switch (cp.detail.couponType) {
                
                case 'Discount':
                    var discountAmt= 0;
                    switch(cp.detail.discountType) {
                        case 'percent':
                            discountAmt = roundToTwo(parseFloat(cp.detail.discountValue)/100 * total);
                            break;
                        case 'dollars':
                            discountAmt = parseFloat(cp.detail.discountValue);
                            if(discountAmt -total<5) {
                                discountAmt = 0;
                                return alert("You total amount after applied should be more than $5");
                            }
                            break;


                    }
                    
                    setTotal(prev => roundToTwo(prev-discountAmt));
                    setCDiscount(prev=> roundToTwo(prev+ discountAmt));

                    break;
                case 'Delivery':
                    setTotal(total=>roundToTwo(total-deliveryFee));
                    setCDiscount("delivery");
                    setDeliveryFee(0);
                    break;

            }

            setCoupon(cp.coupon_id);
        
        
    }

    function removeCoupon() {
        if(cDiscount ==="delivery") {
            setDeliveryFee(3);
            setTotal(pre=> roundToTwo(pre+deliveryFee));
           
        } else {
            
            setTotal(pre=> roundToTwo(pre+cDiscount));
            setCDiscount(0);
        }
        setCoupon('');

    }

    
    
    function editAddress(e) {
        props.history.push("/customer/address");
    }

    function applyRP() {
        setRewardPoints(pre=> pre -50000);
        setRewardPointsUsed(50000);
        setTotal(pre=> pre-5);
    }



    //TODO:
    //make Delivery time a drop down that allow the user to change the time
    //post request to server once the customer place the order
    
    const paymentOption =[
        {text:'card', value: 'card'},
        {text:'cash', value:'cash'},
    ]
   

    return (
        
        <div>
            <Header/>
            {loading? 
                <Loader active inline='centered'>Loading</Loader> 
                :
               
            <div class="container">
                {show && total >0?
                <div>
                <h3>Restaurant name: {carts[0].rname}</h3>
                    
                {carts.map((e, i)=>
                <div>
                    <CartItem key={i} cartItem={e} updateTotal = {updateTotal}/>
                    </div>
                    
                    )}
                    <Divider/>
                    <div class="border  border-secondary" >
                    <div>
                    <div class = "row">
                        <div class="col">
                        <h5 class='text-left'> Subtotal:</h5>
                        </div>
                        <div class="col">
                        <h5 class='text-right'> ${subtotal}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>Delivery fee:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>${deliveryFee}</h5>
                        </div>
                    </div>
                    {coupon !== '' && coupon !== 'delivery'?
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>coupon discount:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>-${cDiscount}</h5>
                        </div>
                    </div>
                    :null}
                    {applied && fdsPromotionDetail.discountType!== "" ?
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>FDS discount:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>-${fd}</h5>
                        </div>
                    </div>
                    :null}
                    {rd > 0 && resPromotionDetail.discount!="" ?
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>Restaurant discount:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>-${rd}</h5>
                        </div>
                    </div>
                    :null}

                    {rewardPointsUsed !== 0 ?
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>Reward points discount:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>-$5</h5>
                        </div>
                    </div>
                    :null}

                    {/* <button type="button" class="btn btn-link" >Use coupons</button> */}
                    
                    <div class="row">
                        <div class="col">
                            <h3 class='text-left font-weight-bold'>Total : </h3>
                        </div>
                        <div class="col">
                            <h3 class="text-right font-weight-bold">${total}</h3>
                        </div>
                    </div>
                        
                    </div>
                    </div>
                    {coupon === ''?
                        <CouponModal useCoupon={useCoupon}/>
                        :
                        <Button onClick={removeCoupon}>Remove coupon</Button>
                    }
                    {!applied && fdsPromotionDetail.length > 0
                    ? <Button color="pink" onClick={applyPromo}>You can enjoy some promotions, Click to apply promotions</Button>
                    :null}

                    {rewardPoints >=50000 && total-5 > 3 && rewardPointsUsed===0 
                    ? <Button color="yellow" onClick={applyRP}>You can use reward points for $5 discount! Click to apply</Button>
                    :null}
                    <Divider/>
                    
                    <Divider/>
                    <div>
                    <label> Delivery details : </label>
                    <label>Address </label>
                    <div class="row">
                        <div class="col">
                            <address > {deliveryAddress}</address>
                        </div>
                        <div class ="col-auto ml-md-auto">
                          
                            <Dropdown
                                button
                                floating
                                labeled
                                text="edit"
                                direction="left"
                            >
                                <Dropdown.Menu>
                                <Dropdown.Header content="Address"/>
                                    {addresses.map((option)=> (
                                        <Dropdown.Item key={option.value} {...option}
                                            onClick={(e,data)=>{
                                                setDeliveryAddress(data.address)}
                                            }
                                        />
                                    ))}
                                <Button
                                 color="orange"
                                 attached="bottom"
                                 content="use new address"
                                 onClick={editAddress}
                                ></Button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    
                    </div>
                    <Divider/>
                    <div class="row">
                        <div class="col">
                        <p> payment : {payment} {payment==="card"? card: ''} </p>
                        </div>
                        <div class ="col-auto ml-md-auto">
                        
                        <Dropdown
                                button
                                floating
                                labeled
                                options={paymentOption}
                                text="change"
                                onChange={(e, data)=> setPayment(data.value)}
                            />
                        </div>
                    </div>
                    
                    <Divider/>
                    <div class = "row">
                        <div class="col">
                        <p>Delivery time:ASAP(~40mins)</p>
                        </div>
                    </div>
                    
                    
                   
                    
                    <Divider/>
                    </div>
                :
                <div class ="mx-auto" style={{width:"350px"}}>
                    <p> </p>
                    <p> You have no item in your cart!....</p>
                </div>
                }
                
               <button class="btn btn-light" onClick={back}>Back to Restaurant/home</button>
               {show && total > 0? 
                <PaymentButton 
                    disabled={total<5} 
                    redirectTOHomePage={redirectTOHomePage} 
                    address={deliveryAddress} 
                    payment={payment} 
                    total={total} 
                    deliveryFee={deliveryFee} 
                    coupon={coupon}
                    rewardPointsUsed={rewardPointsUsed}
                    />
                : null}
            </div>
            }
        </div>
        
    )
}
