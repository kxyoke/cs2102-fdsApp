const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports =  async (req, res,next) => {
    var out= [];
    const data  = await pool.query(risql.queries.get_detailed_orders, [req.params.oid])
    console.log(data.rows.listofitems);
    for (const d of data.rows) {
        for (const item of d.listofitems) {
            const qty = parseInt(item[1])
            const result = await pool.query(risql.queries.get_foodName, [item[0]]);
            const {name} = result.rows[0];
            const list = {
                id: item[0],
                name: name,
                qty: qty
            }
            out.push(list);
        }
        ;
        console.log(out);
        res.send(out);
    }

}