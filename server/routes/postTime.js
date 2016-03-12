var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var Twit = require('twit');
var CronJob = require('cron').CronJob;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var T = new Twit({
    consumer_key:         process.env.consumerKey,
    consumer_secret:      process.env.consumerSecret,
    access_token:         process.env.accessToken,
    access_token_secret:  process.env.accessTokenSecret
});

var job = {
    cronTime: cronData,
    onTick: function(){},
    start: true,
    timeZone: "America/Los_Angeles",
    runOnInit: false
};

var cronData = '';
var currentCron = null;
var counter = 0;



//need to finish this post end point that accepts the true and false on req.body.pause
//toggle the currentCron to stop on true.

router.put('/', function(req, res) {
    console.log("pause button:", req.body);
    var pause = req.body.pause;
    if (pause == true) {
        currentCron.stop();
    } else {
        currentCron.start();
    }

});



//Post without using workers and clocks

router.post('/', function(req, res) {
    console.log(req.body);

    cronData = req.body.cronData;

    var statusText = req.body.hourTweet;

    job.cronTime = cronData;
    job.onTick = twitterPost;

    currentCron = new CronJob(job);



    console.log(CronJob);

    function twitterPost() {
        var tweet = { status: ''};
        tweet.status = statusText + counter++;
        T.post('statuses/update', tweet, tweeted);
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



