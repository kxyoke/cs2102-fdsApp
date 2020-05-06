const customer = {};
customer.queries = {
    get_res :'SELECT res_id,rname FROM Restaurants WHERE EXISTS (SELECT 1 FROM menuItems WHERE menuItems.res_id = restaurants.res_id) ORDER BY RANDOM()',
    get_orders:'SELECT order_id ,res_id, rname, total, payment, listOfItems , status , (SELECT place_order_time FROM deliveries where order_id =orders.order_id) as orderTime  FROM orders JOIN restaurants using(res_id) WHERE usr_id = $1',
    get_menu: 'SELECT food_id, price, name, description FROM MenuItems WHERE res_id=$1;',
    get_foodName:"SELECT name FROM MenuItems WHERE food_id = $1 AND res_id = $2",
    get_review:"SELECT order_id, rname, food_rev, delivery_rating FROM reviews NATURAL JOIN (orders JOIN restaurants USING (res_id)) WHERE usr_id = $1" ,
    get_pendingReview: "SELECT order_id, (select rname FROM restaurants WHERE orders.res_id = restaurants.res_id), place_order_time FROM orders JOIN deliveries Using (order_id) WHERE order_id NOT IN (SELECT order_id FROM reviews) AND orders.status = 'complete' AND orders.usr_id = $1 AND NOW()::DATE -place_order_time::DATE <= 30 AND NOW()::DATE - place_order_time::DATE >=0 ORDER BY place_order_time DESC",
    get_address:"SELECT address FROM Customers_address WHERE usr_id = $1 ORDER BY last_use_time DESC",
    get_coupons:"SELECT coupon_id, description, expiry_date, is_used FROM Coupons NATURAL JOIN coupongroups WHERE usr_id = $1",
    get_usable_coupons:'SELECT coupon_id, description FROM Coupons NATURAL JOIN coupongroups WHERE usr_id = $1 AND NOT is_used',
    get_profile: "SELECT card_num ,reward_points FROM Customers WHERE usr_id = $1",
    get_cart: 'SELECT res_id, (SELECT DISTINCT rname FROM Restaurants where res_id = cartitems.res_id) as rname, food_id, (SELECT name FROM menuitems where food_id = cartitems.food_id AND res_id = cartitems.res_id) as foodname, qty, (SELECT price FROM MenuItems WHERE res_id = cartitems.res_id and food_id=cartitems.food_id)as price FROM cartitems WHERE usr_id = $1',
    get_cart_for_backend:'SELECT res_id, food_id, qty FROM cartitems WHERE usr_id = $1',
    update_cart:'UPDATE cartItems SET qty=$3 WHERE usr_id =$1 AND food_id = $2',
    get_order_not_complete: 'SELECT order_id, res_id, rname, total, payment, listofitems, status,(SELECT place_order_time FROM deliveries where order_id = orders.order_id) as orderTime FROM orders JOIN restaurants using (res_id) WHERE usr_id = $1 AND status <> \'complete\'',
    get_delivery_detail: 'SELECT dr_leave_for_res,dr_leave_res, dr_arrive_cus FROM deliveries WHERE order_id = $1',
    get_fds_current_promos:  'SELECT description FROM Promotions WHERE promotype = \'FDS\' AND start_day < NOW() AND NOW() < end_day',
    get_res_current_promos: 'SELECT description FROM promotions WHERE res_id = $1 AND start_day<NOW() AND NOW() < end_day',
    get_all_current_promos:
     'SELECT promotype, description FROM promotions WHERE start_day<NOW() AND NOW() < end_day AND res_id = (SELECT distinct res_id FROM cartitems WHERE usr_id = $1) UNION SELECT promotype, description FROM promotions WHERE start_day<NOW() AND NOW() < end_day',
     get_reward_points: 'SELECT reward_points FROM customers where usr_id = $1'
}
customer.function = {
    add_cart: "call addCartItem($1,$2,$3,$4)",
    update_address:"call updateAddress($1, $2,$3)",
    delete_address:"call deleteAddress($1, $2)",
    update_card:"call updateCard($1, $2)",
    add_address:"call addAddress($1, $2)",
    add_review:"call addReview($1,$2,$3)",
    place_order:"call placeOrder($1,$2,$3,$4,$5,$6,$7,$8, $9)",
    use_coupon:"update coupons set is_used = true where coupon_id = $1"
}

module.exports = customer;