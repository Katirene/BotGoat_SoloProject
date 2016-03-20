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


var params = {
    screen_name: 'botgoatbasics',
    count: 1
};

var cronData = '';
var currentCron;
var counter = 0;
var tweetMode = '';
var pause = false;
var oldStatusText = '';
var stream;



//toggle the currentCron to stop on true.

router.put('/', function(req, res) {
    console.log("pause button:", req.body);
    if (currentCron) {
        pause = req.body.pause;
        if (pause == true) {
            currentCron.stop();
        } else {
            currentCron.start();
        }
    }
    if (stream) {
        pause = req.body.pause;
        if (pause == true) {
            stream.stop();
        } else {
            stream.start();
        }
    }

    res.status(200).end();
});


var botData = null;


//currently not using function to get my latest tweet from twitter.  Swapped out the front end with an i frame.
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

//currently now using this get call.
router.get('/', function(req, res) {
    getTweet().then(function(result) {
        console.log("here are the botData in router:", botData);
        res.send(botData);
    });
});


//Post a tweet on a schedule.
router.post('/schedule', function(req, res) {
        //resetting pause to undefined (if not already.)
        pause = false;
        console.log('pause:', pause);

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


//route that handles posting to twitter in response to a specific word search
router.post('/word', function(req, res) {
    console.log('inside the post/word route');
    //reset pause to original state
    pause = false;

    //grab inputted search params and tweet text.
    //not checking to see if it matches the global statusText.
    var statusText = req.body.tweetStatus;
    var tweetSearch = req.body.tweetSearch;

    //listen for tweets that match the #tweetSearch. This is the global var stream that is paused inside the put route.
    stream = T.stream('statuses/filter', {track: '#' + tweetSearch, language: 'en' });

    //when a matching tweet is found run function. response data is in eventMsg
    stream.on('tweet', function (eventMsg) {
        console.log(eventMsg);

        //using the msgID to respond to a tweet in the same conversation thread
        var msg = eventMsg.user.text;
        console.log(eventMsg.user);
        var screenName = eventMsg.user.screen_name;
        var msgID = eventMsg.id_str;
        console.log(msgID);

        //package up a replyText to tweet out.
        var replyText = '@' + screenName + ' ' + statusText;

        //send a post/ update to twitter with the response to matching words.
        return T.post('statuses/update', {status: replyText, in_reply_to_status_id: msgID}, function () {
            console.log('I tweeted the message');
        });

    });
    res.sendStatus(200).end();
});



//route that handles tweeting when the bot is at mentioned.
router.post('/mention', function(req, res) {
    console.log('inside mention route');
    //reset the pause to false.
    pause = false;

    //grab the text of the tweet.
    var statusText = req.body.tweetStatus;

    //check to make sure the new tweet on mention is different then the previous one.
    if (statusText != oldStatusText) {
        stream = T.stream('statuses/filter', {track: '@BotGoatBasics'});
    }

    //Update the 'cashed statusText'.  oldStatusText keeps the current tweet. saved globally.
    oldStatusText = statusText;

    //listen for a tweet to mention @BotGoatBasics
    stream.on('tweet', function (tweetEvent) {

        //only using the screen name of the person who mentioned the bot and the tweetId so that this response stays in the same conversation thread.
        var reply_to = tweetEvent.in_reply_to_screen_name;
        var name = tweetEvent.user.screen_name;
        var txt = tweetEvent.text;
        var reply = '@'+ name + ' ' + statusText;
        var tweetId = tweetEvent.id_str;
            console.log(reply);
        //Tweet the response.
        return T.post('statuses/update', {status: reply, in_reply_to_status_id: tweetId}, tweeted);

    });

    res.sendStatus(200).end();

});



function tweeted(err, data, response) {
    if (data) {
        console.log("Data:", data);
    } else if (err) {
        console.log('Tweeted: ' + reply);
    }
}

module.exports = router;