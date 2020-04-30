const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = async (req, res) => {

    pool.query(sql.rQueries.get.allRestaurants, 
        (qerr, qres) => {
            if (qerr) {
                res.status(500).send(qerr.message);
                return
            }
            res.json(qres.rows)
        })
    
};

