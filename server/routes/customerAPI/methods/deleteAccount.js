const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    pool.query(sql.users.function.delete_user, [req.user.usr_id], err=> {
        if(err) {
            console.log(err)
            res.status(443).send(err.message);
        }else {
            req.logout();
            res.send('Your account has deleted');
        }
    })
        
    };