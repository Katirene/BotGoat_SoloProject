myApp.factory('DataFactory', ['$http', function($http) {

    var tweetMode = '';
    var myCronOutput = '';
    var myTweetSearch = '';
    var tweetStatus = '';

    function setMode(mode) {
        tweetMode = mode;
        console.log("mode in factory:", tweetMode);
    }

    function setCron(inputtedCron) {
        myCronOutput = inputtedCron;
        console.log("cronOutput in Factory:", myCronOutput);
    }

    return {
        tweetMode: tweetMode,
        //last_name: last_name,
        //color: color,
        setMode: setMode,
        setCron: setCron
    }


}]);


