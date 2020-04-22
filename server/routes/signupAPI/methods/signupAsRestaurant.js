const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports = async (req, res) => {
    console.log(req.body);
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();
    const res_id = shortid.generate();
    const min_amt = req.body.min_amt;
    const resName = req.body.resName;
    const resAddress = req.body.resAddress;

    pool.query(sql.users.function.addRestaurantStaff, [res_id, id, req.body.username, hash, resName, resAddress, min_amt], (err) => {
        if(err) {
            if(err.message === 'username in used') {
                return res.status(422).send(err.message);
            } else if (err.message === 'usr_id in used') {
                //do something
            } else {
                console.log('database err found')
                console.log(err)
                return res.sendStatus(500);
            }
        } else {
            return res.sendStatus(200);
        }
            
        
    })
    
};

