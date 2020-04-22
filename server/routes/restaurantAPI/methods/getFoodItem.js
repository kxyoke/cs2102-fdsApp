const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

/* Req params should have:
 *  - rid
 *  - fid
 */
module.exports = (req, res) => {
    log.info('Querying rMenuItems from list')
    //const rid = req.params.rid;
    const fids = req.params.fid;
    const formattedFidArray = '{' + fids.slice(1,-1) + '}'
    console.log(formattedFidArray)

    pool.query(rsql.get.foodItems, [formattedFidArray],
        (q_err, q_res) => {
            if (q_err) {
                throw q_err;
            }
            res.json(q_res.rows)
        })
};

/*
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/

