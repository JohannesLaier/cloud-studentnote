angular.module('controllers')
    /**
     * Controller for settings page
     *
     * @param $scope Injected $scope (AngularJS provided service)
     * @param dataService Injected DataService
     */
    .controller('SettingsController', ['$scope', '$rootScope', '$location', 'DataService', function($scope, $rootScope, $location, dataService) {
        $scope.data = dataService.get();

        var init = function() {
			$rootScope.$broadcast('title', 'Einstellungen');
        };
        
        var load = function() {
            $scope.data = dataService.get();
            init();
        };
        
        /**
         * Go back in History for canceling.
         *
         */
        // Abbrechen funktion mit history.back() realisiert
        $scope.goBack = function() {
			window.history.back();
		}
 
        /**
         * Save School
         */
        $scope.save = function() {
    		dataService.updateById('school', $scope.data.school.id, $scope.data.school, function() {
            	load();
            	$location.path('/');
            });
        };
        
        /**
         * Validate inputs
         */
        $scope.validate = function() {
        	if (
    			$scope.data.school
    			&& $scope.data.school.bankAccountName
    			&& $scope.data.school.bankAccountIBAN
    			&& $scope.data.school.bankAccountBIC
    			&& $scope.data.school.bankAccountCreditorID
    			&& $scope.data.school.bankAccountName.trim().length > 0
    			&& $scope.data.school.bankAccountCreditorID.trim().length > 0
    			&& $scope.data.school.bankAccountIBAN.trim().length > 0
    			&& $scope.data.school.bankAccountBIC.trim().length > 0
        	) {
        		return SWIFT.isIBAN($scope.data.school.bankAccountIBAN) && SWIFT.isBIC($scope.data.school.bankAccountBIC);
        	}
        	return true;
        };

        dataService.load(load);
    }]);
