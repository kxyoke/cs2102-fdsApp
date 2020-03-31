const log = require('../logger')
const pool = require('../db');
const sql = require('../sql');

exports.checkAuthenticated=(req, res, next)=> {
    log.info(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
       return next()
    }
    res.status(401).send('Unauthorize!');
}

exports.checkNotAuthenticated=(req, res, next)=> {
    log.info(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
        log.info(req.user)
        return res.status(401).send(req.user.identity);
    } 

    next();
}