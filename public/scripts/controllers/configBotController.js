myApp.controller('BotConfigController', function ($scope, $http) {


    console.log('In BotConfigController');

    var pause = false;

    $scope.hourTweet = '';
    $scope.myCronOutput = '';

    $scope.myConfig = {
        options: {
            allowMinute: true,
            allowDay: true,
            allowWeek : true,
            allowMonth : true,
            allowYear : false
        }
    };

    $scope.hourlyTweet = function() {
        var hourTweet = {cronData: $scope.myCronOutput, hourTweet: $scope.hourTweet};
        console.log(hourTweet);
        postTime(hourTweet);
    };

    $scope.pause = function() {
        pause ^= true;

        pauseBot(pause);
    };

    //hourTweet is the object that has 2 properties. hour: sets the interval of time, hourTweet sets the status.
    function postTime(hourTweet) {
        $http.post('/postTime', hourTweet).then(function(response) {
            console.log('Tweet with time interval has been send to Server');
            console.log(response.config.data.hourTweet);
            $scope.latestTweet = response.config.data.hourTweet;
            console.log($scope.latestTweet);
        });
    }

    function pauseBot(shouldPause) {
        console.log('PauseBot(): pause=' + shouldPause);

        $http.put('/postTime', {pause: shouldPause}).then(function() {
            console.log('Pause info sent to server')
        });
    }


});