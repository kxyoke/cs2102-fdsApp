const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurantQueries');

/* Req params should have:
 *  - rid
 *  - fid
 */
module.exports = (req, res) => {
    log.info('Querying rMenuItem')
    const rid = req.params.rid;
    const fid = req.params.fid;

    pool.query(rsql.queries.get.foodItem, [fid, rid],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
};

/*
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/

