const pool = require('../../../db'); // psql db
const log = require('../../../logger')
const rsql = require('../../../sql/restaurantQueries');

const shortid = require('shortid');

/* Req params should have:
 *  - rid
 * Req body should have:
 *  - name
 *  - description
 *  - price
 *
 * Res should contain:
 *  - fid != NULL, if successful.
 */
module.exports = (req, res) => {
    log.info('Querying add rMenuItem.');
    const rid = req.params.rid;
    const fname = req.body.name;
    const fdesc = req.body.description;
    const price = req.body.price;

    const fid = shortid.generate(); // assume no collisions given low rate

    pool.query(rsql.queries.add.menuItem, [TODO],
        (q_err, q_res) => {
            res.json(q_res.rows)
        })
};

/*
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/

