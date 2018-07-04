angular.module('controllers')
/**
 * Controller for dashboard page
 *
 * @param $scope Injected $scope (AngularJS provided service)
 * @param dataService Injected DataService
 */
	.controller('MainController', ['$scope', 'DataService', 'RESTService', function($scope, dataService, restService) {
		$scope.data = dataService.get();
		$scope.title = 'Aufgabenwerkstatt';
		
		var init = function() {
			$scope.data = dataService.get();
			if (!$scope.data.user.email) {
				$scope.logout();
			}
			$scope.$on('title', function(event, title) {
				$scope.title = title;
			});
			if (!$scope.data.user.admin) {
				$(".admin-only").remove();
			}
		};
		
		$scope.hideNavBar = function() {
			$(".is-visible").removeClass("is-visible");
		};

		/**
         * Logs the user out.
         *
         */
		$scope.logout = function() {
			window.location.href = 'rest/auth/logout';
		};
		
		dataService.load(init);
	}])
;
