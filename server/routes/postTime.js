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

//var job = {
//    cronTime: cronData,
//    onTick: function(){},
//    start: true,
//    timeZone: "America/Los_Angeles",
//    runOnInit: false
//};

var params = {
    screen_name: 'botgoatbasics',
    count: 1
};

var cronData = '';
var currentCron = null;
var counter = 0;
var tweetMode = '';



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


//Post a tweet on a schedule.
router.post('/schedule', function(req, res) {

        cronData = req.body.cronData;

        var statusText = req.body.tweetStatus;

        var job = {
            cronTime: cronData,
            onTick: twitterPost,
            start: true,
            timeZone: "America/Los_Angeles",
            runOnInit: false
        };

        currentCron = new CronJob(job);

        console.log('this is my CronJob with new data:', currentCron);

        function twitterPost() {
            console.log('inside twitterPost');
            var tweet = {status: ''};
            tweet.status = statusText + counter++;
            T.post('statuses/update', tweet, tweeted);
        }
        res.status(200).end();

});

router.post('/word', function(req, res) {

        var statusText = req.body.tweetStatus;
        var tweetSearch = req.body.tweetSearch;

    console.log('inside the post/word route');

    var stream = T.stream('statuses/filter', {track: '#' + tweetSearch, language: 'en' });

    stream.on('tweet', function (eventMsg) {
        console.log(eventMsg);
        var msg = eventMsg.user.text;
        console.log(eventMsg.user);
        var screenName = eventMsg.user.screen_name;
        var msgID = eventMsg.user.id_str;
        console.log(msgID);
        var replyText = '@' + screenName + ' ' + statusText;
        return T.post('statuses/update', {in_reply_to_status_id: msgID, status: replyText}, function () {
            console.log('I tweeted the message');
        });

    });




// filter the public stream by english tweets containing `#apple`

    //var stream = T.stream('statuses/filter', { user_update: 'tweetSearch', language: 'en' });
    //
    //stream.on('tweet', function (tweetEvent) {
    //    console.log(tweet);
    //    console.log(tweetEvent);
    //});



    //stream.on('disconnect', function (disconnectMessage) {
    //    console.log('this is a disconnectedMessage:', disconnectMessage);
    ////});
    //
    //stream.on('warning', function (warning) {
    //    console.log('this is a warning from Twitter:', warning);
    //});


    res.sendStatus(200).end
});

router.post('/mention', function(req, res) {


    var statusText = req.body.tweetStatus;
    function twitterPost() {
        var tweet = {status: ''};
        tweet.status = statusText + counter++;
        //T.post('statuses/update', tweet, tweeted);
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