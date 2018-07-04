'use strict';

/**
 * Initialize dependency modules
 */
angular.module('directives', []);
angular.module('filters', []);
angular.module('services', []);
angular.module('controllers', []);

/**
 * Loads the template of the URL with the fitting controller.
 * If no valid URL redirect to dashboard.
 */
angular.module('app', ['ngRoute', 'directives', 'filters', 'services', 'controllers'])
  .config(function($routeProvider) {
    $routeProvider
		.when('/dashboard', {
			templateUrl: 'views/app/dashboard.html',
			controller: 'DashboardController'
		})
		.when('/dashboard/:id', {
			templateUrl: 'views/app/dashboard_detail.html',
			controller: 'DashboardController'
		})
		.when('/teachers', {
			templateUrl: 'views/app/teachers.html',
			controller : 'TeachersController'
		})
    	.when('/teachers/:id', {
			templateUrl: 'views/app/teachers_detail.html',
			controller : 'TeachersController'
		})
		.when('/students', {
			templateUrl: 'views/app/students.html',
			controller : 'StudentController'
		})
    	.when('/students/:id', {
			templateUrl: 'views/app/students_detail.html',
			controller : 'StudentController'
		})
		.when('/export', {
			templateUrl: 'views/app/export.html',
			contoller : 'ExportController'
		})
		.when('/report', {
			contoller : 'ReportController',
			templateUrl : 'views/app/report.html'
		})
		.when('/calendar', {
			contoller : 'CalendarController',
			templateUrl : 'views/app/calendar.html'
		})
		.when('/settings', {
			contoller : 'SettingsController',
			templateUrl : 'views/app/settings.html'
		})
		.otherwise({ redirectTo: '/dashboard'});
  })
;
