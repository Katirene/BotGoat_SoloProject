myApp.controller('HomeController', function ($scope, $http) {

    getLatestTweet();

    $scope.latestTweet = 'Your Bots Latest Tweet';

        function getLatestTweet() {
        $http.get('/postTime').then(function(response) {
           console.log(response);
            $scope.latestTweet = response.data.baseTweet;

        });
    }
});