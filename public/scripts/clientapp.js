var myApp = angular.module("myApp", ['angular-cron-jobs', 'ngRoute', 'ui.bootstrap']);
console.log('We are in client-app.js AngularLand');

myApp.config(['$routeProvider', function($routeProvider) {
    console.log('Hitting Route Provider');
    $routeProvider
        .when('/configBot', {
            templateUrl: './templates/configBot.html',
            controller: 'BotConfigController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);