myApp.controller('BotConfigController', function ($scope, $http) {


    console.log('In BotConfigController');

    //Moved to Home Controller
    //var pause = false;

    //Moved to Step 3 Controller
    //$scope.hourTweet = '';

  //Moved to step 2 controller
    //$scope.myCronOutput = '';
    //
    //$scope.myConfig = {
    //    options: {
    //        allowMinute: true,
    //        allowDay: true,
    //        allowWeek : true,
    //        allowMonth : true,
    //        allowYear : false
    //    }
    //};


    //Moved to Step 3 controller.
    //$scope.hourlyTweet = function() {
    //    var hourTweet = {cronData: $scope.myCronOutput, hourTweet: $scope.hourTweet};
    //    console.log(hourTweet);
    //    postTime(hourTweet);
    //};

    //Moved to Home Controller.
    //$scope.pause = function() {
    //    pause ^= true;
    //
    //    pauseBot(pause);
    //};


    //Moved to Step 3 Controller.
    //hourTweet is the object that has 2 properties. hour: sets the interval of time, hourTweet sets the status.
    //function postTime(hourTweet) {
    //    $http.post('/postTime', hourTweet).then(function(response) {
    //        console.log('Tweet with time interval has been send to Server');
    //        console.log(response.config.data.hourTweet);
    //        $scope.latestTweet = response.config.data.hourTweet;
    //        console.log($scope.latestTweet);
    //    });
    //}

    //Moved to Home Controller
    //function pauseBot(shouldPause) {
    //    console.log('PauseBot(): pause=' + shouldPause);
    //
    //    $http.put('/postTime', {pause: shouldPause}).then(function() {
    //        console.log('Pause info sent to server')
    //    });
    //}


});