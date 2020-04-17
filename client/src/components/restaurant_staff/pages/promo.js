import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button, Header } from 'semantic-ui-react'
import ResHeader from '../layouts/header';

import { useHistory } from 'react-router-dom'
import PromoEdit from './promoForm'
import PromoTable from '../components/utils/PromoCards'

import runWithRid from './performWithRid'
import Utils from '../components/utils/utils'

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
           reloadActivePromos(rid)
           reloadFuturePromos(rid)
           reloadPastPromos(rid)
       });
    }, [])

    function reloadActivePromos(rid) {
        axios.get('/api/restaurant/promos/active/' + rid)
            .then(res => {
                if (res.status == 200) {
                    setActivePromos(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    function reloadFuturePromos(rid) {
        axios.get('/api/restaurant/promos/future/' + rid)
            .then(res => {
                if (res.status == 200) {
                    setFuturePromos(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    function reloadPastPromos(rid) {
        axios.get('/api/restaurant/promos/past/' + rid)
            .then(res => {
                if (res.status == 200) {
                    setPastPromos(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            });
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
        <ResHeader/>
        {show? 
        <div className='container'>
          <Button color='yellow' style={{ maginTop: '5em', marginBottom: '0.5em' }}
            onClick={e => segueToAddItem()}
            >Add a promo</Button>
          <Header as='h2'>Active promotions</Header>
          <PromoTable activeStatus={Utils.PROMO_STATUS.active} promos={activePromos} />
          <Header as='h2'>Future promotions</Header>
          <PromoTable activeStatus={Utils.PROMO_STATUS.future} promos={futurePromos} />
          <Header as='h2'>Past promotions</Header>
          <PromoTable activeStatus={Utils.PROMO_STATUS.past} promos={pastPromos} />
        </div>
        : <div><p>loading</p></div>
        }
      </div>
    )
}
