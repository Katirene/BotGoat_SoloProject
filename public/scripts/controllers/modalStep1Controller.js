myApp.controller('StepOneController', function ($scope) {

    $scope.tweetMode = null;

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
});