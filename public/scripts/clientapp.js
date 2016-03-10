var myApp = angular.module("myApp", ['angular-cron-jobs', 'ngRoute']);
console.log('We are in client-app.js AngularLand');

myApp.config(['$routeProvider', function($routeProvider) {
    console.log('Hitting Route Provider');
    $routeProvider
        .when('/dashboard', {
            templateUrl: './templates/dashboard.html',
            controller: 'DashboardController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);