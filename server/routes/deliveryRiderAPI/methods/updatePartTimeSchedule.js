const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    console.log(req.body[0].scheduleList);
    var lengthOfQuery = req.body[0].scheduleList.length;
    var twoDArray = Array(lengthOfQuery);
    for (var i = 0; i < lengthOfQuery; i++){
        var insideArray = Array(3);
        insideArray[0] = req.body[0].scheduleList[i].dayOfWeek;
        insideArray[1] = req.body[0].scheduleList[i].startTime;
        insideArray[2] = req.body[0].scheduleList[i].endTime;
        twoDArray[i] = insideArray;
    }
    console.log(twoDArray);
    pool.query(risql.function.edit_PTschedule_by_username, [req.user.usr_id, twoDArray, req.body[1]],
        (q_err, q_res) => {
            if (q_err) {
                res.status(422).send(q_err.message);
            } else {
                console.log(q_res);
                console.log("HI");
                res.json(q_res);
            }
        });
};