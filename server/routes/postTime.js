var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var Twit = require('twit');
var CronJob = require('cron').CronJob;
//var clock = require('../clock');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var T = new Twit({
    consumer_key:         process.env.consumerKey,
    consumer_secret:      process.env.consumerSecret,
    access_token:         process.env.accessToken,
    access_token_secret:  process.env.accessTokenSecret
});



var counter = 0;


//router.post('/', function(req, res) {
//    console.log(req.body);
//
//    //var pause = req.body.pause;
//
//    var cronData = req.body.cronData;
//
//    var postTimeStatus = req.body.hourTweet;
//
//    postTimeStatus = postTimeStatus + counter;
//
//    var tweet = {
//        status: postTimeStatus
//    };
//
//    clock.cronTime = cronData;
//    clock.onTick = function () {twitterPost(tweet)};
//
//    new CronJob(clock);
//
//    console.log(CronJob);
//
//    function twitterPost(tweet) {
//    T.post('statuses/update', tweet, tweeted);
//    counter++;
//    }
//
//});
//
//
//
//function tweeted(err, data, response) {
//    if (data) {
//        console.log("Data:", data);
//    } else if (err) {
//        console.log("Err:", err);
//    }
//}

//module.exports = router;


var job = {
    cronTime: '',
    onTick: function(){},
    start: false,
    timeZone: "America/Los_Angeles",
    runOnInit: true
};



//Post without using workers and clocks
router.post('/', function(req, res) {
    console.log(req.body);

    var cronData = req.body.cronData;

    var postTimeStatus = req.body.hourTweet;

    postTimeStatus = postTimeStatus + counter;

    var tweet = {
        status: postTimeStatus
    };

    job.cronTime = cronData;
    job.onTick = function () {twitterPost(tweet)};

    new CronJob(job);

    console.log(CronJob);

    function twitterPost(tweet) {
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



