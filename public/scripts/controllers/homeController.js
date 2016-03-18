myApp.controller('HomeController', function ($scope, $http) {

    $scope.buttonText = 'Pause Bot';
    $scope.isActive = false;

    $scope.latestTweet = 'Your Bots Latest Tweet';

        function getLatestTweet() {
        $http.get('/postTime').then(function(response) {
           console.log(response);
            $scope.latestTweet = response.data.baseTweet;

        });
    }

    $scope.pause = function() {
        $scope.isActive ^= true;
        pauseBot(!$scope.isActive);
            if ($scope.buttonText == 'Pause Bot') {
                $scope.buttonText = 'Resume Bot';
            } else {
                $scope.buttonText = 'Pause Bot';
            }
    };

    function pauseBot(shouldPause) {
        var pause = shouldPause ? 1 : 0;

        console.log('PauseBot(): pause=' + pause);

        $http.put('/postTime', {pause: pause}).then(function() {
            console.log('Pause info sent to server')
        });
    }
});