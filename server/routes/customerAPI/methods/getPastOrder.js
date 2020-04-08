const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports =  async (req, res,next) => {
    console.log(req.user);
    var out= [];
    const data = await pool.query(sql.customer.queries.get_orders, [req.user.usr_id])
    console.log(data.rows);
    // await data.rows.forEach(async record=> {
    //     record.foodItem=[];
       
    //     record.listofitems.forEach(async e=> {
    //         console.log(e);
    //         const x = await pool.query(sql.customer.queries.get_foodName,[e]);
    //             record.foodItem.push(x.rows[0].name);
                
    //         })

                
    // });
    console.log(data.rows);
    res.send(data.rows);
    
}
