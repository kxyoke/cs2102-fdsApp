const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying r food categories.')
    const rid = req.params.rid;

    pool.query(rsql.get.rFoodCategories, [rid],
        (q_err, q_res) => {
            if (q_err) {
                throw q_err;
            }
            let cats = [];
            for (var i = 0; i < q_res.rows.length; i++) {
                cats.push(q_res.rows[i].category)
            }
            log.info("submitted " + JSON.stringify(cats))
            res.json(cats)
        })
};

/*
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/

