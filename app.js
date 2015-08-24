var myApp = angular.module('myApp', ['ngRoute', 'orderControllers']);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/login',{
		templateUrl: 'login.html',
		controller: 'LoginController'
	}).
	when('/orders',{
		templateUrl: 'orders.html',
		controller: 'ListController'
	}).
	when('/neworder',{
		templateUrl: 'neworder.html',
		controller: 'NewOrderController'
	}).
	when('/view/:itemId',{
		templateUrl: 'vieworder.html',
		controller: 'ViewController'
	}).
	when('/edit/:itemId',{
		templateUrl: 'editorder.html',
		controller: 'EditController'
	}).
	when('/delete/:itemId',{
		templateUrl: 'deleteorder.html',
		controller: 'DeleteController'
	}).
	when('/register',{
		templateUrl: 'register.html',
		controller: 'RegisterController'
	}).
	otherwise({
		redirectTo: '/login'
	});
}]);