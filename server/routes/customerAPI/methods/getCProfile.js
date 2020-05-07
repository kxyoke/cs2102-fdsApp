const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_profile, [req.user.usr_id], (err, data) => {
        if(err) {
            console.log("Database fail to get the data");
            return res.send(err);
        }
        if(data.rows[0].card_num!=null ) {
            var cardnumber= data.rows[0].card_num.toString();
            const len = cardnumber.length;
            cardnumber= cardnumber.replace(cardnumber.substring(3, len-3), "*".repeat(len-6));
        } else {
            cardnumber=null;
        }
            
       
             res.send({usr_id: req.user.usr_id,
                    username: req.user.username,
                    cardnumber: cardnumber,
                    rewardpoints: data.rows[0].reward_points})
    })
    
};