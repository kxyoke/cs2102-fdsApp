const users = {}

users.queries = {
    find_user_by_username: 'SELECT * FROM users WHERE username = $1',
    find_user_by_id: 'SELECT * FROM users WHERE usr_id = $1',
    get_users:'SELECT * FROM users',
    find_res_staff: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM restaurantstaffs)',
    find_customer: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM customers)',
    find_rider: 'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM riders)',
    find_fds:'SELECT * FROM users WHERE username=$1 AND usr_id IN(SELECT usr_id FROM fdsmanagers)',
}


module.exports = users;