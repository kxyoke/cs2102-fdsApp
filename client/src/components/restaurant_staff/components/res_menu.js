import React, { useState, useEffect } from 'react'
import { Pagination } from 'semantic-ui-react'

import axios from 'axios'

export default function RMenu(props) {
    const numFoodPerPage = 8;
    const cat_all = 'All';

    const { rid, rCategories, allCategories } = props;

    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pageNum, setPageNum] = useState(1);
    const [itemsShownInPage, setShownItems] = useState([]);

    const [currentCat, setShowingCat] = useState(cat_all);
    const [currentCatItems, setCurrentCatItems] = useState([]);

    useEffect(() => {
            axios.get('/api/restaurant/menu/' + rid)
                .then(res => {
                    if (res.status == 200) {
                        setCurrentCatItems(res.data)
                        setLoading(false)
                    }
                });
    }, [])

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
        setShownItems(currentCatItems.slice(startIncl, endExcl))
    }, [pageNum])

    function filter(cat) {
        if (cat == cat_all) {
            setCurrentCatItems(menu)
        } else {
            filterSpecificCat(cat)
        }
    }
    function filterSpecificCat(cat) {
        let filtered = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].category == cat) {
                filtered.push(menu[i])
            }
        }
        return filtered;
    }

    function formatIntoCardInput(foodItem) {
        const onEditHandler = (e) => {
            segueToEditItem(foodItem, allCategories)
        }
        const onDeleteHandler = (e) => {
            axios.delete('/api/restaurant/menu/' + rid + '/' + foodItem.food_id)
                .then(res => {
                    if (res.status == 200) {
                        //also remove from this menu so dunnid reload
                        let updated = menu.filter( item => item.food_id != foodItem.food_id );
                        setMenu(updated);
                    }
                });
        }
        const onAvailabilityHandler = (e, makeAvail) => {
            axios.put('/api/restaurant/menu/' + rid + '/' + foodItem.food_id + '/makeAvailable', {
                avail: makeAvail
            })
                .then(res => {
                    if (res.status == 200) {
                        for (var i=0; i < menu.length; i++) {
                            if (menu[i].food_id == foodItem.food_id) {
                                menu[i].available = makeAvail
                                break
                            }
                        }
                    }
                });
        }
        return {
            fooditem: foodItem,
            onEditHandler: onEditHandler,
            onDeleteHandler: onDeleteHandler,
            onAvailabilityHandler: onAvailabilityHandler
        }
    }
    
    function segueToEditItem(fooditem, foodCats) {
        history.push({
            pathname: '/restaurant/menu/edit',
            state: {
                isAdd: false,
                foodCategories: foodCats,
                foodItem: fooditem
            }
        })
        //upon done, will return to menu; so entire data will alr reload by itself.
    }

    return (
      <div>
        <p>Halo</p>
        <FoodItemCardGroup formattedFoodItems={itemsShownInPage.map( formatIntoCardInput )} />
        <Pagination 
          activePage={pageNum} 
          totalPages={Math.ceil(currentCatItems.length / numFoodPerPage)} 
          onPageChange={ (e, pgnum) => setPageNum(pgnum) } 
          defaultActivePage={1}
          ellipsisItem={null}
          />
      </div>
    )
}

