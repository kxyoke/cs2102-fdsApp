const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const log = require('../../../logger');

module.exports = async (req, res) => {
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();
    pool.query(sql.users.function.addCustomer, [id,req.body.username,hash], (err)=> {
        if(err) {
            log.error(err.message);
            if(err.message === 'username in used') {
                return res.status(422).send(err.message);
            } else if (err.message === 'usr_id in used') {
                //do something
            } else {
                log.error('database err found')
                return res.sendStatus(500);
            }
        } else {
            res.sendStatus(200);
        }
    });
};

