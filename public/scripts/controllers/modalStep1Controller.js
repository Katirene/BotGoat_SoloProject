myApp.controller('StepOneController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    console.log('inside Step One Controller');

    $scope.dataFactory = DataFactory;

    $scope.tweetMode = '';

    $scope.myCronOutput = '';

    $scope.myTweetSearch = '';

    $scope.updateFactoryTweetMode = updateFactoryTweetMode;

    $scope.updateFactoryTweetSearchText = updateFactoryTweetSearchText;

    $scope.myConfig = {
        options: {
            allowMinute: true,
            allowDay: true,
            allowWeek : true,
            allowMonth : true,
            allowYear : false
        }
    };

    function updateFactoryTweetMode() {
        console.log($scope.tweetMode);
        $scope.dataFactory.setMode($scope.tweetMode);
    }

    function updateFactoryTweetSearchText() {
        console.log($scope.myTweetSearch);
        $scope.dataFactory.setSearch($scope.myTweetSearch);
    }

    $scope.$watch("myCronOutput", function(newValue, oldValue){
        console.log($scope.myCronOutput);
        $scope.dataFactory.setCron($scope.myCronOutput);
    });




}]);