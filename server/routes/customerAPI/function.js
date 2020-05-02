const pool = require('../../db');
const sql = require('../../sql');
const log = require('../../logger');

module.exports = {
    //this function convert list of item with food_id and qty(in string) 
    //to food_id, food name and qty(num);
    foodItemConvert: async (data) =>{
    const res = [];
    
    const {listofitems} = data;
    console.log(listofitems);
    for (const item of listofitems) {
        const qty = parseInt(item[1])
        const result = await pool.query(sql.customer.queries.get_foodName,[item[0]]);
        if (result.rows.length<=0) continue;
        const {name} = result.rows[0]; 
        const list = {
            id:item[0],
            name:name,
            qty:qty
        }
        res.push(list);
    };
        return res;
    }

}