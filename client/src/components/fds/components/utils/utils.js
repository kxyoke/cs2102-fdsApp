const utils = {

    fdsPromoParser: (desc) => {
        let typed = desc.split(':')
        let tokens = typed[1].split(';')

        return {
            promoType: typed[0],
            discountType: tokens[2],
            discountValue: tokens[1]
        }
    },

    fdsCouponParser: (desc) => {
        let typed = desc.split(':')
        let tokens = typed[1].split(';')

        return {
            couponType: typed[0],
            discountType: tokens[2],
            discountValue: tokens[1]
        }
    },

    getPromoDesc: (promoType, discountType, discountValue) => {
        if (promoType == 'Delivery') {
            return "Application-wide free delivery"
        } else {
            return (discountType == 'dollars'? "$": "") + discountValue 
                + (discountType == 'percentage'? "": "%") + " off first order"
        }
    },

    getCouponDesc: (couponType, discountType, discountValue) => {
        if (couponType == 'Delivery') {
            return "Free delivery"
        } else {
            return (discountType == 'dollars'? "$": "") + discountValue 
                + (discountType == 'percentage'? "": "%") + " discount on order"
        }
    },
}

module.exports = utils;