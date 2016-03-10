var CronJob = require('cron').CronJob;
var postTime = require('./routes/postTime.js');


var job = {
    cronTime: '',
    onTick: function(){},
    start: false,
    timeZone: "America/Los_Angeles",
    runOnInit: true
};


module.exports = job;