var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var Twit = require('Twit');
var CronJob = require('cron').CronJob;
var clock = require('../clock.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var T = new Twit({
    consumer_key:         '4YyqIMibH47iWuE3Cqu5wbuFy',
    consumer_secret:      'rWKRjDh4i0WbJc2hkYXctLQFyTndOjJVmaDXYcdiFmDwWe0tSS',
    access_token:         '706879652892008449-lMnd1agwVk6HW5pt9COCeoUHd4IKaeR',
    access_token_secret:  'mdIOV6vmESdE6IAmTLXhAYF1PHcu9T3FpnBnt79u4s6YY'
});

var counter = 0;

router.post('/', function(req, res) {
    console.log(req.body);


    var cronData = req.body.cronData;

    var postTimeStatus = req.body.hourTweet;

    postTimeStatus = postTimeStatus + counter;

    var tweet = {
        status: postTimeStatus
    };

    clock.cronTime = cronData;
    clock.onTick = function() {twitterPost(tweet)};

    console.log(clock);

    new CronJob(clock);

    function twitterPost(tweet) {
        console.log(tweet);
        T.post('statuses/update', tweet, tweeted);
        counter++;
    }
});



function tweeted(err, data, response) {
    if (data) {
        console.log("Data:", data);
    } else if (err) {
        console.log("Err:", err);
    }
}

module.exports = router;














//module.exports.router = router.tweet;
//module.exports.router = router.cronData;
//module.exports = router;
