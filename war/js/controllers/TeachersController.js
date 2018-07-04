angular.module('controllers')
    /**
     * Controller for teachers page
     *
     * @param $scope Injected $scope (AngularJS provided service)
     * @param dataService Injected DataService
     */
    .controller('TeachersController', ['$scope', '$routeParams', '$rootScope', '$window', '$timeout', '$location', 'DataService', function($scope, $routeParams, $rootScope, $window, $timeout, $location, dataService) {
        $scope.data = dataService.get();
        $scope.current = dataService.getById('teachers', $routeParams.id) || {};
        $scope.students = [];

		// Set password fields
		$scope.current.password2 = $scope.current.password;

		var init = function() {
			if ($routeParams.id == 'add') {
				$scope.current.salary = 13.33333;
        		$rootScope.$broadcast('title', 'Lehrer Anlegen');
			} else if ($routeParams.id) {
				$rootScope.$broadcast('title', $scope.current.firstName + ' ' + $scope.current.lastName);
			} else {
				$rootScope.$broadcast('title', 'Lehrerübersicht');
			}
		};

        var load = function() {
            $scope.data = dataService.get();
            $scope.current = dataService.getById('teachers', $routeParams.id) || {};
			$scope.students = [];
			$scope.students = $scope.students.concat(dataService.getByField('students', 'teacher', $routeParams.id));
			$scope.students = $scope.students.concat(dataService.getByField('students', 'teacherSubstitute', $routeParams.id));
			init();
        };
        /**
         * Remove a teacher
         *
         * @param id The ID of the teacher
         */
        $scope.remove = function($event, teacherID) {
			// Only delete  unallocated teachers
			for (var id in $scope.data.classes) {
				var klasse = $scope.data.classes[id];
				if (klasse.teacher == teacherID) {
					alert("Der Lehrer ist noch der Klasse " + klasse.name + " zugeordnet und kann deshalb nicht gelöscht werden.");
					return;
				}
				if (teacherID == $scope.data.user.id) {
					alert("Sie sind als " + $scope.data.user.firstName + " " + $scope.data.user.lastName + " angemeldet und können sich nicht selbst l�schen.");
					return;
				}
			}

			dataService.removeById('teachers', teacherID, function() {
				load();
			});
            $event.preventDefault();
        };

        /**
         * Add Teacher/Save Teacher
         */
        $scope.save = function() {
        	delete $scope.current.password2;
        	if ($routeParams.id == 'add') {
        		dataService.add('teachers', $scope.current, function(current) {
                	$location.path('/teachers/');
                });
    		} else {
            	dataService.updateById('teachers', $scope.current.id, $scope.current, function() {
                	load();
                	$location.path('/teachers/');
            	});
        	}
    	};

    	/**
         * Validate the iban and the bic
         */
        $scope.validate = function() {
        	if (
    			$scope.current
    			&& $scope.current.iban
    			&& $scope.current.bic
    			&& $scope.current.iban.trim().length > 0
    			&& $scope.current.bic.trim().length > 0
        	) {
        		return SWIFT.isIBAN($scope.current.iban) && SWIFT.isBIC($scope.current.bic);
        	}
        	return true;
        };

        dataService.load(load);
    }]);
