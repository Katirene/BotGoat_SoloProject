var CronJob = require('cron').CronJob;
var postTime = require('./routes/postTime.js');
var Twit = require('twit');
var cronData = require('./routes/postTime.js').cronData;


var job = {
    cronTime: cronData,
    onTick: function(){},
    start: false,
    timeZone: "America/Los_Angeles",
    runOnInit: true
};


module.exports = job;