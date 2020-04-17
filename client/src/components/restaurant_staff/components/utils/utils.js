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
    }


}

module.exports = utils;

