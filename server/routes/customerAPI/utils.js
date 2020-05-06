const pool = require('../../db');
const sql = require('../../sql');
const log = require('../../logger');

module.exports = {
    //this function convert list of item with food_id and qty(in string) 
    //to food_id, food name and qty(num);
    foodItemConvert: async (data) =>{
        const res = [];
        
        const {listofitems} = data;
        console.log('food item convert is');
        console.log(listofitems);
        for (const item of listofitems) {
            const qty = item[1]; //parseInt(item[1])
            console.log(item[0]);
            const result = await pool.query(sql.customer.queries.get_foodName,[item[0], data.res_id]);
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
    },

    convertCartItemToListOfItem:(data)=> {
        console.log('convert cart item is ');
        console.log(JSON.stringify(data));
        const listofitems = [];
        for (const item of data) {
            const temp = '(' + item.food_id + ', ' + item.qty.toString() + ')';
            //const temp = [item.food_id, item.qty.toString()];
            listofitems.push(temp);
        }
        return listofitems;
    }

}
