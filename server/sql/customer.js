const customer = {};
customer.queries = {
    get_res :'SELECT res_id,rname FROM Restaurants WHERE EXISTS (SELECT 1 FROM menuItems WHERE menuItems.res_id = restaurants.res_id) ORDER BY RANDOM()',
    get_orders:'SELECT order_id ,res_id, rname, total, payment, listOfItems , status , (SELECT place_order_time FROM deliveries where order_id =orders.order_id) as orderTime  FROM orders JOIN restaurants using(res_id) WHERE usr_id = $1',
    get_menu: 'SELECT food_id, price, name, description FROM MenuItems WHERE res_id=$1;',
    get_foodName:"SELECT name FROM MenuItems WHERE food_id = $1",
    get_review:"SELECT order_id, rname, food_rev, delivery_rating FROM reviews NATURAL JOIN (orders JOIN restaurants USING (res_id)) WHERE usr_id = $1" ,
    get_pendingReview: "SELECT order_id, (select rname FROM restaurants WHERE orders.res_id = restaurants.res_id), place_order_time FROM orders JOIN deliveries Using (order_id) WHERE order_id NOT IN (SELECT order_id FROM reviews) AND orders.status = 'complete' AND orders.usr_id = $1 AND NOW()::DATE -place_order_time::DATE <= 30 AND NOW()::DATE - place_order_time::DATE >=0 ORDER BY place_order_time DESC",
    get_address:"SELECT address FROM Customers_address WHERE usr_id = $1",
    get_coupons:"SELECT coupon_id, description, expiry_date, is_used FROM Coupons NATURAL JOIN coupongroups WHERE usr_id = $1",
    get_profile: "SELECT card_num ,reward_points FROM Customers WHERE usr_id = $1",
    get_cart: 'SELECT res_id, (SELECT rname FROM Restaurants where res_id = cartitems.res_id) as rname, food_id, (SELECT name FROM menuitems where food_id = cartitems.food_id) as foodname, qty, (SELECT price FROM MenuItems WHERE res_id = cartitems.res_id and food_id=cartitems.food_id)as price FROM cartitems WHERE usr_id = $1',
    update_cart:'UPDATE cartItems SET qty=$3 WHERE usr_id =$1 AND food_id = $2',
    
}
customer.function = {
    add_cart: "call addCartItem($1,$2,$3,$4)",
    update_address:"call updateAddress($1, $2,$3)",
    delete_address:"call deleteAddress($1, $2)",
    update_card:"call updateCard($1, $2)",
    add_address:"call addAddress($1, $2)",
    add_review:"call addReview($1,$2,$3)"
}

module.exports = customer;