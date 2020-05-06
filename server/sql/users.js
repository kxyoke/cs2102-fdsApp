const users = {}

users.queries = {
    find_user_by_username: 'SELECT * FROM users WHERE username = $1',
    find_user_by_id: 'SELECT * FROM users WHERE usr_id = $1',
    get_users:'SELECT * FROM users',
    find_res_staff: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM restaurantstaffs)',
    find_customer: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM customers)',
    find_rider: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM riders)',
    find_fds:'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM fdsmanagers)',
    //can change to function??
    find_res_staff_by_id: 'SELECT * FROM restaurantstaffs WHERE usr_id = $1',
    find_customer_by_id: 'SELECT * FROM customers WHERE usr_id = $1',
    find_rider_by_id: 'SELECT * FROM riders WHERE usr_id = $1',
    find_fds_by_id:'SELECT * FROM fdsmanagers WHERE usr_id = $1',
    get_res_pwd: 'SELECT password_digest FROM Restaurants WHERE res_id = $1',
}

users.function ={
    addCustomer: 'CALL addCustomer($1,$2,$3)',
    addFullTimeRider: 'CALL addFullTimeRider($1,$2,$3)',
    addPartTimeRider: 'CALL addPartTimeRider($1,$2,$3)',
    addRestaurantStaffAndRes: 'CALL addResStaffAndRes($1,$2,$3, $4, $5, $6, $7, $8)',
    addRestaurantStaffOnly: 'CALL addResStaffOnly($1,$2,$3, $4)',
    update_username:"call updateUsername($1, $2)",
    update_password:"call updatePassword($1, $2)",
  
}

module.exports = users;
