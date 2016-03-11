var CronJob = require('cron').CronJob;
var postTime = require('./routes/postTime.js');
var Twit = require('twit');


var job = {
    cronTime: '',
    onTick: function(){},
    start: false,
    timeZone: "America/Los_Angeles",
    runOnInit: true
};


module.exports = job;