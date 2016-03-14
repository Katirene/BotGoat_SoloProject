myApp.controller('HomeController', function ($scope, $http) {


    //commented out to not Ping API on page load for now.
    //getLatestTweet();

    var pause = false;

    $scope.latestTweet = 'Your Bots Latest Tweet';

        function getLatestTweet() {
        $http.get('/postTime').then(function(response) {
           console.log(response);
            $scope.latestTweet = response.data.baseTweet;

        });
    }

    $scope.pause = function() {
        pause ^= true;

        pauseBot(pause);
    };

    function pauseBot(shouldPause) {
        console.log('PauseBot(): pause=' + shouldPause);

        $http.put('/postTime', {pause: shouldPause}).then(function() {
            console.log('Pause info sent to server')
        });
    }
});