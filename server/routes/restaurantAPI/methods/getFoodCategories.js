const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

/* Req params should have:
 *  - rid
 *  - fid
 */
module.exports = (req, res) => {
    log.info('Querying all food categories atm.')

    pool.query(rsql.get.allFoodCategories,
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

