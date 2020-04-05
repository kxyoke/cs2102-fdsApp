const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db');
const sql = require('../sql');
const log = require('../logger');

const localCustomerStrategy = require('./passports/local-customer');
const localResStaffStrategy = require('./passports/local-restaurant');
const localFDSStrategy = require('./passports/local-fds');
const localRiderStrategy = require('./passports/local-rider');

function findUserById(id, done) {
    pool.query(sql.users.queries.find_user_by_id, [id], (err, data) => {
        if(err) {
            log.error('Failed to get user from the database')
            return done(null);
        }

        if(data.rows.length === 0) {
            log.error('User does not exist');
            return done(null);
        }

        if(data.rows.length === 1) {
            // console.log(data.rows[0])
            return done(null, 
                {usr_id:data.rows[0].usr_id, username: data.rows[0].username});
        }

        log.error('More than one user');
        return done(null);
    })
}


passport.serializeUser((user, done) =>{
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.usr_id)});
passport.deserializeUser((id, done)=> {
    console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  findUserById(id, done)});
// exports.initPassport = () => {passport.use(new LocalStrategy({passReqToCallback:true, usernameField:'username', passwordField:'password' }, authenticateUser))};
exports.initPassport = () => {passport.use('local-cus', localCustomerStrategy),
                            passport.use('local-fds', localFDSStrategy),
                            passport.use('local-res-staff', localResStaffStrategy),
                            passport.use('local-rider', localRiderStrategy)};

