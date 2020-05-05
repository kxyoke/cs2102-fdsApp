import React, { useState, useEffect } from 'react'

import { Header, Image, Icon, Segment, Dropdown, Statistic } from 'semantic-ui-react'

import axios from 'axios'
import Utils from './utils/utils'

export default function RHome(props) {
    const allTimeMonth = 0;
    const { rid } = props.userInfo;

    const [isLoadingNum, setIsLoadingNum] = useState(true);
    const [isLoadingCost, setIsLoadingCost] = useState(true);
    const [isLoadingFoods, setIsLoadingFoods] = useState(true);
    const [month, setMonth] = useState(Utils.getMonthOf(new Date()));

    const [numOrders, setNumOrders] = useState(0);
    const [totalEarned, setEarned] = useState(0);
    const [top5Favs, setFavs] = useState([]);

    let monthOptions = [...Array(Utils.getMonthOf(new Date())).keys()]
        .map(v => v == 0 
            ? {key: v, text: `All time statistics`, value: v} 
            : {key: v, text: `FDS Month ${v}`, value: v});

    useEffect(() => {
        var monthDates = {start: Utils.fdsD1, end: new Date()}
        if (month > 0) {
            monthDates = Utils.getDate_startEndOfMonth(month);
        }
        axios.get('/api/restaurant/stats/orders/num/' + rid 
            + '/' + Utils.formatDateString(monthDates.start)
            + '/' + Utils.formatDateString(monthDates.end))
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    setNumOrders(res.data[0].total)
                    setIsLoadingNum(false)
                } else {
                    alert(res)
                }
            })
            .catch(err => {
                alert("Error getting statistics: number of completed orders!");
                console.log(err)
            });
        axios.get('/api/restaurant/stats/orders/earnings/' + rid 
            + '/' + Utils.formatDateString(monthDates.start)
            + '/' + Utils.formatDateString(monthDates.end))
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    setEarned(res.data[0].total)
                    setIsLoadingCost(false)
                } else {
                    alert(res)
                }
            })
            .catch(err => {
                alert("Error getting statistics: cost of completed orders!");
                console.log(err)
            });
        axios.get('/api/restaurant/stats/favFoods/' + rid 
            + '/' + Utils.formatDateString(monthDates.start)
            + '/' + Utils.formatDateString(monthDates.end))
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    setFavs(res.data)
                    setIsLoadingFoods(false)
                } else {
                    alert(res)
                }
            })
            .catch(err => {
                alert("Error getting statistics: fav foods!");
                console.log(err)
            });
    }, [month])

    function FoodIcon(props) {
        const {name, imagepath, price, numOrders} = props.food;
        return (
            <Segment circular style={{width: 175, height: 175}}>
              <Header as='h2'>
                {name} (${price})
                <Header.Subheader>Ordered in {numOrders}!</Header.Subheader>
                <Header.Subheader><Image src={imagepath} size='mini' circular /></Header.Subheader>
              </Header>
            </Segment>
        )
    }

    function FoodIconBlob() {
        return (
            <Segment circular secondary style={{width: 175, height: 175}}>
              <Header as='h2'>NIL</Header>
            </Segment>
        )
    }

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='chart pie' circular />
          <Header.Content>Dashboard :]</Header.Content>
        </Header>

        <Dropdown
          placeholder='Select statistics period'
          fluid
          search
          selection
          options={monthOptions}
          defaultValue={month}
          loading={isLoadingNum || isLoadingCost || isLoadingFoods}
          onChange={ (e,data) => {setMonth(data.value)} }
        />

        <Statistic.Group width='two'>
          <Statistic>
            <Statistic.Value><Icon name='edit outline' />{numOrders}</Statistic.Value>
            </Statistic>
          <Statistic>
            <Statistic.Value><Icon name='dollar sign' />{totalEarned}</Statistic.Value>
          </Statistic>
        </Statistic.Group>

        {top5Favs.map(f => <FoodIcon food={f} />)}
        {top5Favs.length == 5 ? null
            : [...Array(5 - top5Favs - 1).keys()].map(x => <FoodIconBlob />)}

      </div>
    )
}

