import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Divider, Header, Segment, Form, Input } from 'semantic-ui-react'

import axios from 'axios'

export default function RMenuItemEdit(props) {
    const history = useHistory();
    const cat_others = 'Others';

    const [showOtherCategory, setShowOtherCategory] = useState(false);

    const {isAdd, foodCategories} = props;
    const {food_id, res_id, price, daily_limit, name, description, imagepath, category} = props.foodItem;

    const [newPrice, setPrice] = useState(0);
    const [newLimit, setLimit] = useState(0);
    const [newName, setName] = useState('');
    const [newDesc, setDesc] = useState('');
    const [newImgPath, setImgPath] = useState('');
    const [newCategory, setCategory] = useState(cat_others);
    const [addedCategory, setAddedCategory] = useState('');

    useEffect(() => {
        if (!isAdd) {
            setPrice(price)
            setLimit(daily_limit)
            setName(name)
            setDesc(description)
            setImgPath(imagepath)
            setCategory(category)
        }
    }, [props])

    useEffect(() => {
        if (newCategory == cat_others) {
            setShowOtherCategory(true)
        } else {
            setShowOtherCategory(false)
        }
    }, [newCategory])

    function submitForm(e) {
        var cat = newCategory;
        if (newCategory == cat_others) {
            cat = addedCategory
        }
        //TODO: validate form details
        const reqBody = {
            price: newPrice,
            daily_limit: newLimit,
            name: newName,
            description: newDesc,
            image_path: newImgPath,
            category: cat
        }
        console.log("submitted will get this:")
        console.log(JSON.stringify(reqBody))
/*
        if (isAdd) {
            submitAdd(reqBody)
        } else {
            submitEdit(reqBody)
        }
*/
    }

    function submitAdd(reqBody) {
        axios.post('/api/restaurant/menu/' + res_id, reqBody)
            .then(res => {
                if (res.status == 200) {
                    returnToMenu()
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    function submitEdit(reqBody) {
        axios.post('/api/restaurant/menu/' + res_id + '/' + food_id, reqBody)
            .then(res => {
                if (res.status == 200) {
                    returnToMenu()
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    function returnToMenu() {
        history.push('/restaurant/menu')
    }


    return (
      <div className="menuEditForm">
        {isAdd?
          <div>
            <Header as='h2' dividing={true} textAlgin="center" style={{ paddingTop: '1em', paddingBottom: '1em' }}>Add a new food item</Header>
          </div>
        : <div>
            <Header as='h2' dividing={true} textAlign='center' style={{ paddingTop: '1em', paddingBottom: '1em' }}>Edit food item: {name}</Header>
          </div>
        }
        <div className="form">
          <Form>
            <Form.Group widths='equal'>
              <Form.Field label='Food name' control='input'
                defaultValue={name} placeholder='food name here'
                onChange={ e => setName(e.target.value) } />
              <Form.Field label='Food category' control='select'
                defaultValue={category}
                onChange={ e => setCategory(e.target.value) } >
                {foodCategories.map( c => (
                    <option value={c.category}>{c.category}</option>
                ))}
              </Form.Field>
              {showOtherCategory?
                  <Form.Field label='Use this category instead' control='input'
                    placeholder='new category'
                    onChange={ e => setAddedCategory(e.target.value) } />
                : <p>Select 'Others' to input your own category.</p>
              }
            </Form.Group>
            <Form.Group grouped>
              <Form.Field label='Food image' control='input'
                defaultValue={imagepath} placeholder='idk somehow change to fiel selection? idk how this works. good to have.'
                onChange={ e => setImgPath(e.target.value) } />
            </Form.Group>
          </Form>
        </div>
      </div>
    )
}

