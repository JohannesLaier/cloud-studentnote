'use strict';

/**
 * Initialize dependency modules
 */
angular.module('directives', []);
angular.module('filters', []);
angular.module('services', []);
angular.module('controllers', []);

angular.module('app', ['ngRoute', 'directives', 'filters', 'services', 'controllers'])
  .config(function($routeProvider) {
	  $routeProvider
	  	.when('/register', {
			templateUrl: 'views/login/register.html',
			contoller : 'AController'
		})
		.when('/login', {
			templateUrl: 'views/login/login.html',
			controller: 'LoginController'
		})
		.otherwise({ redirectTo: '/login'});
  })
;
