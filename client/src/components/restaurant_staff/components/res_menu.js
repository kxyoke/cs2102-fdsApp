import React, { useState, useEffect } from 'react'
import { Pagination } from 'semantic-ui-react'

import axios from 'axios'

export default function RMenu(props) {
    const numFoodPerPage = 8;
    const cat_all = 'All';

    const {menu, r_categories} = props;

    const [pageNum, setPageNum] = useState(1);
    const [itemsShownInPage, setShownItems] = useState([]);

    const [currentCat, setShowingCat] = useState(cat_all);
    const [currentCatItems, setCurrentCatItems] = useState([]);

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
            let food = menu[i];
            if (food.category == cat) {
                filtered.push(food)
            }
        }
        setCurrentCatItems(filtered)
    }

    return (
      <div>
        <p>Halo</p>
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

