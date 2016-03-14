myApp.controller('StepOneController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    console.log('inside Step One Controller');

    $scope.dataFactory = DataFactory;

    $scope.tweetMode = 'mention';

    $scope.myCronOutput = '';

    $scope.myTweetSearch = '';

    $scope.updateFactoryTweetMode = updateFactoryTweetMode;

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

    $scope.$watch("myCronOutput", function(newValue, oldValue){
        console.log($scope.myCronOutput);
        $scope.dataFactory.setCron($scope.myCronOutput);
    });




}]);