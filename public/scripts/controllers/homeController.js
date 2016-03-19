myApp.controller('HomeController', ['$scope', 'DataFactory', '$http', function ($scope, DataFactory, $http) {

    $scope.dataFactory = DataFactory;


    var button = $scope.dataFactory.buttonActive;

    $scope.buttonDisplay = {
        text: 'Pause Bot',
        class: false
    };


    function getLatestTweet() {
    $http.get('/postTime').then(function(response) {
       console.log(response);
        $scope.latestTweet = response.data.baseTweet;

    });
    }

    $scope.pause = function() {
        pauseBot(toggleFactoryButtonValue());

    };

    function pauseBot(shouldPause) {
        var pause = shouldPause ? 1 : 0;

        $http.put('/postTime', {pause: pause}).then(function() {
            console.log('Pause info sent to server')
        });
    }

    function toggleFactoryButtonValue() {
        return $scope.dataFactory.setButton();
    }

    $scope.$watch($scope.dataFactory.buttonActive, function(newVal, oldVal) {
        console.log("first stop inside watch:", $scope.dataFactory.buttonActive());
        if ($scope.dataFactory.buttonActive() == 1) {
            $scope.buttonDisplay.text = 'Resume Bot';
            $scope.buttonDisplay.class = true;
            console.log("inside if", $scope.dataFactory.returnButton);
        }
        else if ($scope.dataFactory.buttonActive() == 0) {
            $scope.buttonDisplay.text = 'Pause Bot';
            $scope.buttonDisplay.class = false;
        }
    },true);


    $scope.$watch(button, function(newVal, oldVal) {
        console.log('watching button');
    });

}]);

