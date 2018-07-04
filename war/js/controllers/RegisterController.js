angular.module('controllers')
/**
 * Controller for dashboard page
 *
 * @param $scope Injected $scope (AngularJS provided service)
 * @param restService Injected RESTService
 */
	.controller('RegisterController', ['$scope', 'RESTService', function($scope, restService) {
		$scope.school;
		$scope.firstName;
		$scope.lastName;
		$scope.email;
		$scope.password;

		var loading = new Loading();

		/**
		 * Creates a new account.
		 *
		 */
		$scope.register = function() {
			loading.show();
			
			restService.register(
				$scope.school,
				$scope.firstName,
				$scope.lastName,
				$scope.email,
				$scope.password
			).success(function(status) {
				if (status) {
					window.location.href = 'index.html';
				} else {
					invalidEmail();
				}
			}).error(invalidEmail);
		};

		var invalidEmail = function() {
			$scope.email = '';

			var inavlidEmail = $('#invalidEmail');
			inavlidEmail.fadeIn();
			setTimeout(function() {
				inavlidEmail.fadeOut();
			}, 5000);
			
			loading.hide();
		};
	}])
;