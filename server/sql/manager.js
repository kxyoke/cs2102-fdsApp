const queries = {};

queries.get = {
    profile:
        'SELECT * FROM FdsManagers WHERE usr_id = $1',
    allPromos:
        'SELECT * FROM Promotions WHERE promotype = ''FDS''',
    promo:
        'SELECT * FROM Promotions WHERE pid = %1',
    coupon:
        'SELECT * FROM Coupons WHERE coupon_id = %1',
}

queries.update = {
    password:
        'CALL updateManagerPassword($1, $2)', //usr_id, password
    promo:
        'CALL updateManagerPromo($1, $2, $3, $4)', // pid, description, start_day, end_day
    coupon:
        'CALL updateCoupon($1, $2, $3)', //coupon_id, description, expiry_date
}

queries.add = {
    promo:
        'CALL addManagerPromo($1, $2, $3, $4)',//pid, description, start_day, end_day
    coupon:
        'CALL addCoupon($1, $2, $3)' //coupon_id, description, expiry_date
}