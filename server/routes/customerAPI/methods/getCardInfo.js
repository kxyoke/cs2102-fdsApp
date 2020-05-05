const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    pool.query(sql.customer.queries.get_profile, [req.user.usr_id], (err, data) => {
        if(err) {
            console.log("Database fail to get the data");
            return res.send(err);
        }
        var cardnumber= data.rows[0].card_num.toString();
        const len = cardnumber.length;
        cardnumber= cardnumber.replace(cardnumber.substring(3, len-3), "*".repeat(len-6));
        res.send({cardnumber: cardnumber});
    })
};