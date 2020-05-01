import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Divider, Header, Message, Form, Input } from 'semantic-ui-react'

import Utils from './utils/utils'
import axios from 'axios'

export default function RMenuItemEdit(props) {
    const history = useHistory();
    const cat_others = 'Others';

    const [showOtherCategory, setShowOtherCategory] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const {isAdd, foodCategories} = props;
    const {food_id, res_id, price, daily_limit, name, description, imagepath, category} = props.foodItem;

    const [newPrice, setPrice] = useState(-1);
    const [newLimit, setLimit] = useState(-1);
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
        if (category == null) {
            setCategory(cat_others)
        } else {
            setCategory(category)
        }
    }, [category])

    useEffect(() => {
        if (newCategory == cat_others) {
            setShowOtherCategory(true)
        } else {
            setShowOtherCategory(false)
        }
    }, [newCategory])

    function validate(withCat) {
        const currencyRegex = Utils.currencyRegex;
        const positiveIntRegex = Utils.positiveIntRegex;

        if (newName == '') {
            setErrorMsg('Food name should not be empty!')
            return false;
        }
        if (withCat == '' || withCat == null) {
            setErrorMsg('Category should not be empty!')
            return false;
        }
        if (!currencyRegex.test(newPrice) || newPrice < 0) {
            setErrorMsg('Please input a valid price! Also omit the $ sign.')
            return false;
        }
        if (!positiveIntRegex.test(newLimit) || newLimit <= 0) {
            setErrorMsg('Please input a valid limit!')
            return false;
        }
        //img..
        return true;
    }

    function submitForm(e) {
        var cat = newCategory;
        if (newCategory == cat_others) {
            cat = addedCategory
        }

        const isValid = validate(cat);
        if (!isValid) {
            setHasError(true)
            console.log("input invalid.")
            return;
        }
        var imgpath = newImgPath
        if (newImgPath == '') {
            imgpath = null
        }

        const reqBody = {
            price: newPrice,
            daily_limit: newLimit,
            name: newName,
            description: newDesc,
            image_path: imgpath,
            category: cat
        }
        
        if (isAdd) {
            submitAdd(reqBody)
        } else {
            submitEdit(reqBody)
        }
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
        axios.put('/api/restaurant/menu/' + res_id + '/' + food_id, reqBody)
            .then(res => {
                if (res.status == 200) {
                    returnToMenu()
                } else {
                    alert('Submission not successful. Please try again.')
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
            <Header as='h2' dividing={true} textAlign="center" style={{ paddingTop: '1em', paddingBottom: '1em', display: 'flex', justifyContent: 'center'}}>Add a new food item</Header>
          </div>
        : <div>
            <Header as='h2' dividing={true} textAlign='center' style={{ paddingTop: '1em', paddingBottom: '1em' ,display: 'flex', justifyContent: 'center'}}>Edit food item: {name}</Header>
          </div>
        }
        <div className="container" style={{ paddingTop: '1.5em' }}>
          <Form error>
            <Form.Group widths='equal'>
              <Form.Field required label='Food name' control='input'
                defaultValue={name} placeholder='food name here'
                onChange={ e => setName(e.target.value) } />
              <Form.Field required label='Price ($)' control='input'
                defaultValue={price} placeholder='omit $'
                onChange={ e => setPrice(e.target.value) } />
              <Form.Field required label='Daily qty available' control='input'
                defaultValue={daily_limit} placeholder='daily limit'
                onChange={ e => setLimit(e.target.value) } />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required label='Food category' control='select'
                defaultValue={category == null ? "Others" : category}
                onChange={ e => setCategory(e.target.value) } >
                {foodCategories.map( c => (
                    <option value={c.category}>{c.category}</option>
                ))}
              </Form.Field>
              {showOtherCategory?
                  <Form.Field label='-' control='input'
                    placeholder='new category'
                    onChange={ e => setAddedCategory(e.target.value) } />
                : <p>Select 'Others' to input your own category.</p>
              }
            </Form.Group>
            <Form.TextArea label='Description' placeholder='Tell us more about your food item' 
                onChange={ e => setDesc(e.target.value) } />
            <Form.Group grouped>
              <Form.Field label='Food image' control='input'
                defaultValue={imagepath} placeholder='idk somehow change to fiel selection? idk how this works. good to have.'
                onChange={ e => setImgPath(e.target.value) } />
            </Form.Group>
            {hasError?
              <div>
                <Message 
                  error 
                  header='Action Forbidden'
                  content={errorMsg} />
              </div>
              : <div></div>
            }
          </Form>
          <Header style={{ display: 'flex', justifyContent: 'center'}}>
            <Button type='submit' onClick={submitForm}> Confirm </Button>
          </Header>
        </div>
      </div>
    )
}

