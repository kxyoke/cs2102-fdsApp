const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {

    pool.query(risql.queries.get_profile, [req.user.usr_id], (err, data) => {
        if (err) {
            console.log("Database fail to get the data");
            return res.send(err);
        }

        res.send({
            username: req.user.username,
        })
    });

    // res.send('Queried get riderProfile.');
};