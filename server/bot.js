//var express = require('express');
//var app = express();
//var router = express.Router();
//var bodyParser = require('body-parser');
//var Twit = require('Twit');
//var postTime = require('./routes/postTime');
//
//var tweet = postTime.tweet;
//var cronData = postTime.cronData;
//
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//
//
//var T = new Twit({
//    consumer_key:         '4YyqIMibH47iWuE3Cqu5wbuFy',
//    consumer_secret:      'rWKRjDh4i0WbJc2hkYXctLQFyTndOjJVmaDXYcdiFmDwWe0tSS',
//    access_token:         '706879652892008449-lMnd1agwVk6HW5pt9COCeoUHd4IKaeR',
//    access_token_secret:  'mdIOV6vmESdE6IAmTLXhAYF1PHcu9T3FpnBnt79u4s6YY'
//});
//
//module.exports = {
//    start: function() {twitterPost()}
//};
//
//function twitterPost() {
//    console.log(tweet);
//    T.post('statuses/update', tweet, tweeted);
//}
//
//
//
//module.exports.twitterPost = twitterPost;
//
//
//
////callback is not necessary however it is often helpful incase you get an error.
//function tweeted(err, data, response) {
//    if (data) {
//        console.log("Data:", data);
//    } else if (err) {
//        console.log("Err:", err);
//    }
//}
//
