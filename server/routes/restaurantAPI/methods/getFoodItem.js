const pool = require('../../../db'); // psql db
const log = require('../../../logger');

/* Req body should have:
 *  - rid
 *  - fid
 */
module.exports = (req, res) => {
    log.info('Querying rMenuItem')
    const rid = req.params.rid;
    const fid = req.params.fid;
    const my_query = `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE food_id = ${fid} AND res_id = ${rid}`;
    pool.query(my_query,
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
    //res.send('Queried get rMenuItem.');
};

/*
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/

