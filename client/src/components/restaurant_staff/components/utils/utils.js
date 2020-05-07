const fdsD1 = new Date(2020, 0) //assuming fds 1st day = 1/1/2020

const utils = {
    roundNumberTo2Dp: (num) => (Math.round(parseFloat(num) * 100)/100).toFixed(2),
    
    getNumDaysBetween: (d1, d2) => Math.ceil(Math.abs(d2 - d1) / (1000 * 3600 * 24)),
    
    /*FDS-GREGORIAN DATE CONVERSION*/
    fdsD1: fdsD1,
    
    getDate_startEndOfMonth: (monthNum) => {
        //assuming wk/month starts from wk/month 1 (not 0)
        let startOfMonth = new Date(2020, 0);
        startOfMonth.setDate(startOfMonth.getDate() + (monthNum - 1) * 7 * 4);
        let endOfMonth = new Date(2020, 0);
        endOfMonth.setDate(endOfMonth.getDate() + monthNum * 7 * 4);
        return {start: startOfMonth, end: endOfMonth};
    },

    getMonthOf: (date) => {
        let diffInMs = Math.abs(date - fdsD1);
        let diffInWeeks = diffInMs / (1000 * 3600 * 24 * 7);
        return 1 + Math.floor(diffInWeeks / 4);
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
        //const format = "YYYY-MM-DD HH:mm:SS";
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
        if (tokens[0] === 'absolute') {
            promoType = true
        } else if (tokens[0] === 'percent') {
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

