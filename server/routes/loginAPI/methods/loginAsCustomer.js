const pool = require('../../../db'); // psql db
const passport = require('passport');
const log = require('../../../logger')

module.exports = (req, res, next) => {
    log.info('Inside POST /login callback')
    return passport.authenticate('local-cus', (err,user,info) => {
        log.info('Inside passport.authenticate() callback');
        log.info(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        log.info(`req.user: ${JSON.stringify(req.user)}`)
        if(err) {
            return res.send(err);
        }
        if(!user) {
            return res.status(401).send("wrong username or password")
        }
        
        if (err) { return next(err); }
            
        req.login(user, (err) =>{
            log.info('Inside req.login() callback')
            log.info(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            log.info(`req.user: ${JSON.stringify(req.user)}`)
            return res.sendStatus(200);
        })
            
    })(req, res, next)

};

