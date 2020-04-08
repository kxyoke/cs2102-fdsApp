const customer = {};
customer.queries = {
    get_res :'SELECT res_id,rname FROM Restaurants ORDER BY RANDOM() LIMIT 10',
    get_orders:'SELECT order_id ,res_id,listOfItems FROM orders WHERE usr_id = $1',
    get_menu: 'SELECT food_id, price, name, description FROM MenuItems NATURAL JOIN FoodItems WHERE res_id=$1;'
}
customer.function = {

}

module.exports = customer;