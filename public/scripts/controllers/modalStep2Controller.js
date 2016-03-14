myApp.controller('StepTwoController', function ($scope) {

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