const queries = {};

queries.get = {
    profile:
        'SELECT * FROM FdsManagers WHERE usr_id = $1;',
    allPromos:
        'SELECT * FROM Promotions',
    promo:
        'SELECT * FROM Promotions WHERE pid = %1',
    coupon:
        'SELECT * FROM Coupons WHERE coupon_id = %1',
}

queries.update = {
    profile:
        '', //is it still 1 manager or multiple managers????
    promo:
        'CALL updateManagerPromo($1, $2, $3, $4, $5)', // pid, promotype, description, start_day, end_day
    coupon:
        'CALL updateCoupon($1, $2, $3)', //coupon_id, description, expiry_date
}

queries.add = {
    promo:
        'CALL addManagerPromo($1, $2, $3, $4, $5)',//pid, promotype, description, start_day, end_day
    coupon:
        'CALL addCoupon($1, $2, $3)' //coupon_id, description, expiry_date
}