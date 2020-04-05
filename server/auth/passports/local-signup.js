const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../../db');
const sql = require('../../sql');
const log = require('../../logger');
function findUserByUsername(username, done) {
    pool.query(sql.users.queries.find_user_by_username, [username], (err, data) => {
        if(err) {
            log.error('Failed to get user from the database')
            console.log(err)
            return done(null);
        }

        if(data.rows.length === 0) {
            log.error('User does not exist');
            return done(null);
        }

        if(data.rows.length === 1) {
            return done(null, data.rows[0]);
        }

        log.error('More than one user');
        return done(null);
    })
}
const authenticateUser = (req, username, password, done) => {
    console.log('Inside local strategy callback')

    findUserByUsername(username, (err, user) => {
        if (err){
            return done(err);
        }

        if(!user) {
            return done(null, false, {
                message:'User Not Found',
                type:'error'
            });
        }

        return bcrypt.compare(password, user.password_digest, (err, isValid)=> {
            if(err) {
                return done(err);
            }
            if(!isValid) {
                return done(null, false, {message : "password is incorrect", type:'error'});
            }
            console.log('Local strategy returned true')
            return done(null,{usr_id:user.usr_id, username: user.username});
    });
})   
};
module.exports = new LocalStrategy({
    passReqToCallback:true, 
    usernameField:'username', 
    passwordField:'password'
}, authenticateUser)