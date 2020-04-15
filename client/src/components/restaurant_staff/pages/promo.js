import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from 'semantic-ui-react'
import Header from '../layouts/header';

import { useHistory } from 'react-router-dom'
import PromoEdit from './promoForm'

import runWithRid from './performWithRid'
import ResUtils from '../components/utils/utils.js'

export default function ResPromo(props) {
    const history = useHistory()
    
    const [show, setShow] = useState(false)
    const [rid, setRid] = useState(null)
    
    const [activePromos, setActivePromos] = useState([])
    const [futurePromos, setFuturePromos] = useState([])
    const [pastPromos, setPastPromos] = useState([])

    useEffect(() => {
       runWithRid( userInfo => {
           const rid = userInfo.rid;
           setRid(rid);
           setShow(true);
           //TODO add other axios requests to crawl the various promos.
           reloadActivePromos()
           reloadFuturePromos()
           reloadPastPromos()
       });
    }, [])

    function reloadActivePromos() {

    }
    function reloadFuturePromos() {
    }
    function reloadPastPromos() {
    }

    function segueToAddItem() {
        history.push({
            pathname: '/restaurant/promos/edit',
            state: {
                isAdd: true,
                promo: { res_id: rid }
            }
        })
    }

    return(
      <div className="ResPromo">
        <Header/>
        {show? 
        <div>
          <Button color='yellow' style={{ maginTop: '1em', marginBottom: '0.5em' }}
            onClick={e => segueToAddItem()}
            >Add a promo</Button>
          <p>replace this para with my ttables when u done with add</p>
        </div>
        : <div><p>loading</p></div>
        }
      </div>
    )
}
