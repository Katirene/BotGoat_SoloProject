myApp.controller('StepTwoController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.tweetStatus = null;

    $scope.tweet = function() {
        var hourTweet = {cronData: $scope.myCronOutput, hourTweet: $scope.tweetStatus};
        console.log(hourTweet);
        postTime(hourTweet);
    };

    function postTime(hourTweet) {
        $http.post('/postTime', hourTweet).then(function(response) {
            console.log('Tweet with time interval has been send to Server');
            console.log(response.config.data.hourTweet);
            $scope.latestTweet = response.config.data.hourTweet;
            console.log($scope.latestTweet);
        });
    }

}]);