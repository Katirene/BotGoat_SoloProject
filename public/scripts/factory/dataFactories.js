myApp.factory('DataFactory', ['$http', function($http) {

    var latestTweet = '';
    var tweetMode = '';
    var myCronOutput = '';
    var myTweetSearch = '';
    var tweetStatus = '';

    function setMode(mode) {
        tweetMode = mode;
        console.log("mode in factory:", tweetMode);
    }

    function setCron(inputtedCron) {
        myCronOutput = inputtedCron;
        console.log("cronOutput in Factory:", myCronOutput);
    }

    function setSearch(searchParams) {
        myTweetSearch = searchParams;
        console.log("myTweetSearch in Factory:", myTweetSearch);
    }

    function setStatus(status) {
        tweetStatus = status;
        console.log("My Tweet Status in Factory:", tweetStatus);

    }

    function deployBot() {
        var tweetParams = {
            cronData: myCronOutput,
            tweetSearch: myTweetSearch,
            tweetStatus: tweetStatus
        };
        console.log('Here are the Tweet Params:', tweetParams);
        postTime(tweetParams);

    }


    function postTime(tweetStatus) {
        console.log(tweetMode);
        $http.post('/postTime/' + tweetMode, tweetStatus).then(function(response) {
            console.log('Tweet with time interval has been send to Server');
            console.log(response.config.data.tweetStatus);
            latestTweet = response.config.data.hourTweet;

        });
    }
    return {
        latestTweet: latestTweet,
        tweetMode: tweetMode,
        setStatus: setStatus,
        setSearch: setSearch,
        setMode: setMode,
        setCron: setCron,
        deployBot: deployBot
    }


}]);


