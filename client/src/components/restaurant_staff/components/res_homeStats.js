import React, { useState, useEffect } from 'react'

import { Header, Grid, Icon, Segment, Dropdown, Statistic } from 'semantic-ui-react'

import axios from 'axios'
import Utils from './utils/utils'

export default function RHome(props) {
    const allTimeMonth = 0;
    const { rid } = props.userInfo;

    const [isLoadingNum, setIsLoadingNum] = useState(true);
    const [isLoadingCost, setIsLoadingCost] = useState(true);
    const [isLoadingFoods, setIsLoadingFoods] = useState(true);
    const [month, setMonth] = useState(0);

    const [numOrders, setNumOrders] = useState(0);
    const [totalEarned, setEarned] = useState(0);
    const [top5Favs, setFavs] = useState([]);

    let monthOptions = [...Array(Utils.getMonthOf(new Date()) + 1).keys()]
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
        const {name, imagepath, price, numorders} = props.food;
        return (
            <Segment circular style={{width: 300, height: 300,
                backgroundImage: `url(${imagepath})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
             <Segment circular style={{
                 width: '100%', height: '100%', 
                 backgroundColor: 'rgba(200,200,200,0.65)'
                }}>
              <Header as='h2' textAlign='center'>
                {name} (${price})
                <Header.Subheader>Ordered in {numorders} orders!</Header.Subheader>
              </Header>
             </Segment>
            </Segment>
        )
    }

    function FoodIconBlob() {
        return (
            <Segment circular secondary style={{width: 300, height: 300}}>
              <Header as='h2'>NIL</Header>
            </Segment>
        )
    }

    return (
      <div className='container'>
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
          loading={isLoadingNum || isLoadingCost || isLoadingFoods}
          onChange={ (e,data) => {setMonth(data.value)} }
        />

      <Segment inverted color='olive'>
        <Segment.Group horizontal>
          <Segment textAlign='center' size='large'>
          <Statistic>
            <Statistic.Value><Icon name='edit outline' />{numOrders}</Statistic.Value>
            <Statistic.Label>COMPLETED ORDERS</Statistic.Label>
          </Statistic>
          </Segment>

          <Segment textAlign='center' size='large'>
          <Statistic>
            <Statistic.Value><Icon name='dollar sign' />{totalEarned}</Statistic.Value>
            <Statistic.Label>IN TOTAL</Statistic.Label>
          </Statistic>
          </Segment>
        </Segment.Group>
      </Segment>

      <Grid centered verticallyAlign='middle' columns={3}>
        {top5Favs.slice(0,2).map(f => (
            <Grid.Column>
              <FoodIcon food={f} />
            </Grid.Column>
        ))}
        
        <Grid.Row centered columns={4}>
        {top5Favs.slice(2).map(f => (
            <Grid.Column>
              <FoodIcon food={f} />
            </Grid.Column>
        ))}
        {top5Favs.length >= 5 ? null
            : [...Array(5 - top5Favs.length).keys()].map(x => (
                <Grid.Column>
                  <FoodIconBlob /> 
                </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>

      </div>
    )
}

