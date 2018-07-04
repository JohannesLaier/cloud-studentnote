angular.module('controllers')
/**
 * Controller for dashboard page
 *
 * @param $scope Injected $scope (AngularJS provided service)
 * @param restService Injected RESTService
 */
	.controller('LoginController', ['$scope', 'RESTService', function($scope, restService) {
		$scope.email;
		$scope.password;
		
		var loading = new Loading();
		
		/**
		 * Check if given email and password are a valid login.
		 *
		 */
		$scope.login = function($event) {
			$event.preventDefault();

			loading.show();
			
			restService.login($scope.email, $scope.password).success(function(status) {
				if (status) {
					window.location.href = 'index.html';
				} else {
					invalidLogin();
				}
			}).error(invalidLogin);
		};
		
		var invalidLogin = function() {
			$scope.email = '';
			$scope.password = '';
		
			//Show "invalid password" Message.
			var inavlidPassword = $('#invalidPassword');
			inavlidPassword.fadeIn();
			setTimeout(function() {
				inavlidPassword.fadeOut();
			}, 5000);
			
			loading.hide();
		};
	}])
;