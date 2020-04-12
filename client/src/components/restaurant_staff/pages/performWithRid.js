import React from 'react'
import axios from 'axios'

/* method should take in object with props staff_id and rid.*/
async function runWithRid( method ) {
    axios.get('/api/restaurant/')
        .then( res => {
            if (res.data.length > 0) {
                method(res.data[0]);
            }
        });
}

export default runWithRid;

