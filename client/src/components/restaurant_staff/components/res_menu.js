import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Tab, Pagination, Loader } from 'semantic-ui-react'
import FoodItemCardGroup from './utils/FoodItemCards'

import axios from 'axios'

export default function RMenu(props) {
    const history = useHistory();

    const numFoodPerPage = 2;
    const cat_all = 'All';

    const { rid, rCategories, allCategories } = props;

    function makePanes() {
        const tabPane = () => 
            <Tab.Pane>
              <FoodItemCardGroup formattedFoodItems={itemsShownInPage.map( formatIntoCardInput )} />
            </Tab.Pane>
        let panes = [{
            menuItem: cat_all,
            render: tabPane
        }];
        for (var i = 0; i < rCategories.length; i++) {
            panes.push({
                menuItem: rCategories[i],
                render: tabPane
            })
        }
        return panes;
    }

    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [didChangeAvailability, setDidChangeAvailability] = useState(false);

    const [pageNum, setPageNum] = useState(1);
    const [itemsShownInPage, setShownItems] = useState([]);

    const [currentCat, setShowingCat] = useState(cat_all);
    const [currentCatItems, setCurrentCatItems] = useState([]);

    useEffect(() => {
            axios.get('/api/restaurant/menu/' + rid)
                .then(res => {
                    if (res.status == 200) {
                        console.log(res.data)
                        setMenu(res.data)
                        setIsLoading(false)
                    }
                });
    }, [])

    useEffect(() => {
        filter(currentCat)
    }, [menu])

    useEffect(() => {
        if (didChangeAvailability) {
            setDidChangeAvailability(false)
            filter(currentCat)
        }
    }, [didChangeAvailability])

    useEffect(() => {
        setPageNum(1);
        filter(currentCat)
    }, [currentCat])

    useEffect(() => {
        console.log("page num changed to: "+pageNum)
        const startIncl = (pageNum - 1) * numFoodPerPage
        const endExcl = pageNum * numFoodPerPage
        console.log("so start end became: "+startIncl+" "+endExcl)
        setShownItems(currentCatItems.slice(startIncl, endExcl))
    }, [pageNum, currentCatItems])

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
        setCurrentCatItems(filtered)
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
                        setDidChangeAvailability(true)
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

    function changeTabToIdx(idx) {
        if (idx == 0) {
            setShowingCat(cat_all)
        } else {
            setShowingCat(rCategories[idx - 1])
        }
    }

    return (
      <div>
        {isLoading?
        <Loader active />
        : 
        <div>
          <Tab panes={makePanes()} onTabChange={ (e,tab) => changeTabToIdx(tab.activeIndex) } />
            <Pagination 
            activePage={pageNum} 
            totalPages={Math.ceil(currentCatItems.length / numFoodPerPage)} 
            onPageChange={ (e, pgnum) => {setPageNum(pgnum.activePage)} } 
            ellipsisItem={null}
            />
        </div>
        }
      </div>
    )
}

