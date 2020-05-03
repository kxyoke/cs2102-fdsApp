const utils = {

    /*FDS-GREGORIAN DATE CONVERSION*/
    getDate_startEndOfWeek = (wkNum) => {
        //assuming fds 1st day = 1/1/2020
        let d0 = new Date(2020, 0);
        //assuming wk starts from wk 1 (not 0)
        let startOfWeek = new Date();
        startOfWeek.setDate(d0.getDate() + (wkNum-1) * 7);
        let endOfWeek = new Date();
        endOfWeek.setDate(d0.getDate() + wkNum * 7);
        return [startOfWeek, endOfWeek];
    },

    /*PROMO STUFF*/
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
        return 'DEFAULT:'+(isAbsoluteNotPercent? 'absolute' : 'percent')+';'+minAmount+';'+discount2Decimal
    },

    getDefaultPromoDescProps: (fulldesc) => {
        let typed = fulldesc.split(':')

        let tokens = typed[1].split(';')
        //min_amt;isAbsNot%;discount
        var promoType = true;
        if (tokens[0] == 'absolute') {
            promoType = true
        } else if (tokens[0] == 'percent') {
            promoType = false
        } else {
            console.log('wtf is wrong wif my life')
            console.log('original was ' + tokens[1])
        }

        return {
            minAmount: tokens[1],
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

