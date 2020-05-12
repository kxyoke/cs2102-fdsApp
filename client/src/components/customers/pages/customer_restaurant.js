import React, {useEffect, useState} from "react";
import axios from "axios";
import ResReview from './customer_res_review'
import Header from "../layout/header";

import { Card, Input, Image, Label, Button,
    Tab, Pagination, Loader,Menu, Segment, } from 'semantic-ui-react';

export default function RestaurantMenu(props) {
    if(props.location.state===undefined) {
        props.history.push('/customer')
    }
    const {res_id, rname} = props.location.state;
    const [isLoading, setIsLoading] = useState(true);
    const menuUrl = '/api/customer/menu/' + res_id;
    const promotionUrl = '/api/customer/promo/res/'+res_id;
    const [menu, setMenu] = useState([]);
    const [promotions, setPromotions] = useState([]);

    const [rFoodCats, setRFoodCats] = useState([]);
    const resCatsUrl = '/api/customer/categories/' + res_id;
    //pagination
    const numFoodPerPage = 4;
    const [pageNum, setPageNum] = useState(1);
    const [itemsShownInPage, setShownItems] = useState([]);
    //tabs
    const cat_all = 'All'
    const [currentCat, setShowingCat] = useState(cat_all);
    const [currentCatItems, setCurrentCatItems] = useState([]);
    function makePanes() {
        //{menu.map((e, i)=>
        //<MenuItem key ={i} foodItem={e} res_id={res_id}/>
        //)}
        const tabPane = () => 
            <Tab.Pane>
                <FoodItemCardGroup formattedFoodItems={itemsShownInPage.map( formatIntoCardInput )} />
            </Tab.Pane>
        let panes = [{
            menuItem: cat_all,
            render: tabPane
        }]
        for (var i=0; i<rFoodCats.length; i++) {
            panes.push({
                menuItem: rFoodCats[i],
                render: tabPane
            })
        }
        return panes;
    }

    function changeTabToIdx(idx) {
        if (idx === 0) {
            setShowingCat(cat_all)
        } else {
            setShowingCat(rFoodCats[idx-1])
        }
    }

    useEffect(() => {
        filter(currentCat)
    }, [menu])

    useEffect(() => {
        setPageNum(1);
        filter(currentCat)
    }, [currentCat])

    useEffect(() => {
        const startIncl = (pageNum - 1) * numFoodPerPage
        const endExcl = pageNum * numFoodPerPage
        console.log("so start end became: "+startIncl+" "+endExcl)
        setShownItems(currentCatItems.slice(startIncl, endExcl))
    }, [pageNum, currentCatItems])

    function filter(cat) {
        if (cat === cat_all) {
            setCurrentCatItems(menu)
        } else {
            filterSpecificCat(cat)
        }
    }
    function filterSpecificCat(cat) {
        let filtered = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].category === cat) {
                filtered.push(menu[i])
            }
        }
        setCurrentCatItems(filtered)
    }

    function formatIntoCardInput(foodItem) {
        return {
            fooditem: foodItem,
            isAvailable: foodItem.available && foodItem.daily_sells < foodItem.daily_limit,
        }
    }


    function processPromotion() {
        //parsing on price/delivery;
    }
    useEffect( ()=> {
        const fetchData = async () => {
        await axios.all([
            axios.get(menuUrl),
            axios.get(promotionUrl),
            axios.get(resCatsUrl)
        ]).then(axios.spread((...res)=> {
            const menu = res[0];
            const promo = res[1];
            const cats = res[2];
                if(menu.data.length > 0) {
                    setIsLoading(false);
                    setMenu(menu.data);
                }
                if (promo.data.length > 0) {
                    setPromotions(promo.data)
                    processPromotion();
                    console.log(promo.data)
                }
                if(cats.data.length > 0) {
                    setRFoodCats(cats.data);
                }
            })).catch(err=>{
                console.log(err)
            })
        };
        fetchData()
        
    }, [menuUrl, promotionUrl])
    const [activeItem, setActiveItem] = useState("Menu")
    const handleItemClick = (e, {name})=>setActiveItem(name);

    return (
        <div>
        <Header></Header>
        <div class="container">
        <h1 class="center">
            {rname}
        </h1>
        {!isLoading?
          <div>
            <Menu attached='top' tabular>
            <Menu.Item
                name="Menu"
                active= {activeItem === 'Menu'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name="Restaurant reviews"
                active={activeItem==='Restaurant reviews'}
                onClick={handleItemClick}
            />
            </Menu>
            <Segment attached = "bottom">
            {activeItem === 'Menu'?
            <div>
            
                <Tab panes={makePanes()} onTabChange={ (e,tab) => changeTabToIdx(tab.activeIndex) } />
                <Pagination
                    activePage={pageNum}
                    totalPages={Math.ceil(currentCatItems.length / numFoodPerPage)}
                    onPageChange={ (e,pgnum) => setPageNum(pgnum.activePage)}
                    ellipsisItem={null}
                    />
            </div>
            : <ResReview rid={res_id}/>}
            </Segment>
          </div>
        
        : <Loader active />
        }
        </div>
        </div>
    )
}

function FoodItemCardGroup(props) {
    const itemsPerRow = 2;
    const {formattedFoodItems} = props;

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
          {formattedFoodItems.map(formattedFoodItem =>
              <FoodItemCard fooditem={formattedFoodItem.fooditem}
                isAvailable={formattedFoodItem.isAvailable}
                />
          )}
        </Card.Group>
    )
}

function FoodItemCard ({fooditem, isAvailable}) {
    const foodMeta = (food) => `Category: ${food.category}; ${food.daily_limit-food.daily_sells} left.`
    const foodDescription = (food) => food.description;
    const foodImage = (food) => {
        let path = food.imagepath
        if (path == '') {
            return 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'
        } else {
            return path
        }
    }

    const [qty, setQty] = useState(0);
    function decrement() {
        if (qty > 0) {
            setQty(qty-1);
        }
    }
    function increment() {
        if (qty < fooditem.daily_limit - fooditem.daily_sells) {
            setQty(qty+1);
        }
    }
    function addToCart() {
        console.log('add to cart')
        if (qty > 0) {
            axios.post('/api/customer/cart/add', 
                  {food_id: fooditem.food_id,
                  res_id: fooditem.res_id,
                    qty: qty})
            .then(res=> {
              if(res.data) {
                alert(res.data);
              } else {
                alert("Added to the cart");
              }
            })
            .catch(err=> {
                console.log(err);
                alert("You have food from different restaurant, clear your cart if you want to order from other restaurants!")
            });
        }
    }

    return (
        <Card color={isAvailable? 'green' : 'red'}>
            <Label as='a' color={isAvailable?'green':'red'} ribbon>
                {isAvailable?'Available!':'Not Available'}
            </Label>
            <Image wrapped ui={false}
              src={foodImage(fooditem)}
              />
            <Card.Content>
              <Card.Header>{fooditem.name} <span className="second-word-formatting">${fooditem.price}</span></Card.Header>
              <Card.Meta>{foodMeta(fooditem)}</Card.Meta>
              <Card.Description>{foodDescription(fooditem)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button icon='minus' onClick={e => decrement()} />
              <Input type='text' value={qty} readOnly action>
                <input />
              </Input>
                <Button icon='plus' onClick={e => increment()} />
                <Button icon='cart' color='teal' onClick={e => addToCart()}>Add To Cart</Button>
            </Card.Content>
        </Card>
    )
}

