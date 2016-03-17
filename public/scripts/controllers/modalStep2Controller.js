myApp.controller('StepTwoController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    console.log('inside Step Two Controller');

    $scope.dataFactory = DataFactory;

    $scope.tweetStatus = null;

    $scope.updateFactoryTweetStatus = updateFactoryTweetStatus;


    function updateFactoryTweetStatus() {
        console.log($scope.tweetStatus);
        $scope.dataFactory.setStatus($scope.tweetStatus);
    }


}]);