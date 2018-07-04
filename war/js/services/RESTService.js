angular.module('services')
	.factory('RESTService', ['$http', function($http) {
		return {

			get: function() {
				return $http.get('../rest/data/get');
			},
			
			add: function(type, entry) {
				return $http.post('../rest/' + type + '/add', entry);
			},
			
			update: function(type, entry) {
				return $http.post('../rest/' + type + '/update', entry);
			},
			
			remove: function(type, id) {
				return $http.delete('../rest/' + type + '/' + id);
			},
			
			getNotReadToPay: function() {
				return $http.get('../rest/students/notreadtopay');
			},
			
			login: function(email, password) {
				return $http.post('../rest/auth/login', {
					email : email,
					password : password
				});
			},
			
			register: function(school, firstName, lastName, email, password) {
				return $http.post('../rest/auth/register', {
					school : school,
					firstName : firstName,
					lastName : lastName,
					email : email,
					password : password
				});
			},
		}
	}])
