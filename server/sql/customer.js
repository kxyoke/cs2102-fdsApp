const customer = {};
customer.queries = {
    get_res :'SELECT res_id,rname FROM Restaurants ORDER BY RANDOM() LIMIT 10',
    get_orders:'SELECT order_id ,res_id, rname, total, payment, listOfItems , status FROM orders NATURAL JOIN restaurants WHERE usr_id = $1',
    get_menu: 'SELECT food_id, price, name, description FROM MenuItems NATURAL JOIN FoodItems WHERE res_id=$1;',
    get_foodName:"SELECT name FROM foodItems WHERE food_id = $1",
    get_review:"SELECT order_id, rname, food_rev, delivery_rating FROM reviews NATURAL JOIN (orders NATURAL JOIN restaurants) WHERE usr_id = $1" ,
    get_address:"SELECT address FROM Customers_address WHERE usr_id = $1",
    get_coupons:"SELECT coupon_id, description, expiry_date FROM Coupons WHERE usr_id = $1",
    get_profile: "SELECT card_num ,reward_points FROM Customers WHERE usr_id = $1",
    get_cart: 'SELECT FoodItems FROM carts WHERE usr_id = $1',
}
customer.function = {
    add_cart: "call addCart($1)"
}

module.exports = customer;