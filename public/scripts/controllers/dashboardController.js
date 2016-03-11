myApp.controller('DashboardController', function ($scope, $http) {

    console.log('In Dashboard Controller');

    $scope.hourTweet = '';
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

    $scope.hourlyTweet = function() {
        var hourTweet = {cronData: $scope.myCronOutput, hourTweet: $scope.hourTweet};
        console.log(hourTweet);
        postTime(hourTweet);
    };

    $scope.pause = function() {
        var pause = {pause: "pause"};
        postTime(pause);
    };

    //hourTweet is the object that has 2 properties. hour: sets the interval of time, hourTweet sets the status.
    function postTime(hourTweet) {
        $http.post('/postTime', hourTweet).then(function() {
            console.log('Tweet with time interval has been send to Server')
        });
    }


    ////time picker controller
    //var that = this;
    //
    //this.isOpen = false;
    //
    //this.openCalendar = function(e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //
    //    that.isOpen = true;
    //};
    //
    //////function for dropdown menu
    ////function MyCtrl($scope) {
    ////
    ////    //$scope.list = [1,2,3, 4];
    //
    //    $scope.current = 0;
    //
    ////}


});