var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var Twit = require('twit');
var CronJob = require('cron').CronJob;
var async = require('async');

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

var params = {
    screen_name: 'botgoatbasics',
    count: 1
};

var cronData = '';
var currentCron = null;
var counter = 0;



//need to finish this post end point that accepts the true and false on req.body.pause
//toggle the currentCron to stop on true.

router.put('/', function(req, res) {
    console.log("pause button:", req.body);
    if (currentCron != null) {
        var pause = req.body.pause;
        if (pause == true) {
            currentCron.stop();
        } else {
            currentCron.start();
        }
    }
    res.status(200).end();
});


var botData = null;

function getTweet() {
    console.log('getTweet()');

    var promise = T.get('/statuses/user_timeline', params)
                .then(function (result) {

        if (result.resp.statusCode == 200) {
            console.log('getTweet(): Got 200 response');

            botData = {
                baseTweet: result.data[0].text,
                tweetID: result.data[0].id_str,
                tweetUsername: result.data[0].user.screen_name
            };
            console.log("here is the botData:", botData);
        } else {
            console.log("getTweet(): Got non-200 response");
        }
    });

    return promise;
}

router.get('/', function(req, res) {
    getTweet().then(function(result) {
        console.log("here are the botData in router:", botData);
        res.send(botData);
    });
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
    res.status(200).end();
});


function tweeted(err, data, response) {
    if (data) {
        console.log("Data:", data);
    } else if (err) {
        console.log("Err:", err);
    }
}

module.exports = router;