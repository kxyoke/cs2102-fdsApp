const fdsManager = {};

fdsManager.queries = {
    get_profile:
        'SELECT * FROM FdsManagers WHERE usr_id = $1',
    get_allPromos:
        'SELECT pid, description, start_day, end_day FROM Promotions WHERE promotype = \'FDS\'',
    get_promo:
        'SELECT * FROM Promotions WHERE pid = %1',
    get_coupons:
        'SELECT * FROM Coupons',
    update_password:
        'CALL updateManagerPassword($1, $2)', //usr_id, password
    update_promo:
        'CALL updateManagerPromo($1, $2, $3, $4)', // pid, description, start_day, end_day
    update_coupon:
        'CALL updateCoupon($1, $2, $3)', //coupon_id, description, expiry_date
    add_promo:
        'CALL addManagerPromo($1, $2, $3, $4)',//pid, description, start_day, end_day
    add_coupon:
        'CALL addCoupon($1, $2, $3)' //coupon_id, description, expiry_date
}

module.exports = fdsManager;