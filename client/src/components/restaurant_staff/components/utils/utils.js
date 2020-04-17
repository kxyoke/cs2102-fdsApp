const utils = {

    PROMO_STATUS: {
        active: 'active',
        future: 'future',
        past: 'past'
    },

    currencyRegex: /^[0-9]\d*(?:(\.\d{0,2})?)$/,
    positiveIntRegex: /^[1-9]\d*$/,

    formatDateString: (datestring) => {
        const format = "YYYY-MM-DD HH:mm:SS";
        const d = new Date(datestring)
        const formattedString = [
            d.getFullYear(),
            (d.getMonth()+1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0')
        ].join('-') + ' ' + [
            d.getHours().toString().padStart(2, '0'),
            d.getMinutes().toString().padStart(2, '0'),
            d.getSeconds().toString().padStart(2, '0')
        ].join(':');

        console.log("date parsed as: " + formattedString)

        return formattedString;
    },

    getPromoDesc: (minAmount, isAbsoluteNotPercent, discount2Decimal) => {
        return 'DEFAULT:'+minAmount+';'+(isAbsoluteNotPercent? 'absolute' : 'percent')+';'+discount2Decimal
    },

    getDefaultPromoDescProps: (fulldesc) => {
        let typed = fulldesc.split(':')

        let tokens = typed[1].split(';')
        //min_amt;isAbsNot%;discount
        var promoType = true;
        if (tokens[1] == 'absolute') {
            promoType = true
        } else if (tokens[1] == 'percent') {
            promoType = false
        } else {
            console.log('wtf is wrong wif my life')
            console.log('original was ' + tokens[1])
        }

        return {
            minAmount: tokens[0],
            isAbs: promoType,
            discount: tokens[2]
        }
    },

    getPrettyPromoDesc: (minAmount, isAbsoluteNotPercent, discount2Decimal) => {
        return 'Min spending of $'+minAmount+' to get '
            + (isAbsoluteNotPercent? "$" : "")
            + discount2Decimal + (isAbsoluteNotPercent? "" : "%" )
            + ' discount off.'
    },

}

module.exports = utils;

