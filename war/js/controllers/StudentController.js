angular.module('controllers')
    /**
     * Controller for student page
     *
     * @param $scope Injected $scope (AngularJS provided service)
     * @param dataService Injected DataService
     */
    .controller('StudentController', ['$scope', '$routeParams', '$rootScope', '$timeout', '$window', '$location', 'DataService', function($scope, $routeParams, $rootScope, $timeout, $window, $location, dataService) {
        $scope.data = dataService.get();
        $scope.current = dataService.getById('students', $routeParams.id) || {};
        
        var init = function() {
        	$('.datepicker').datetimepicker({
        	    locale: 'de'
        	});
        	if ($routeParams.id == 'add') {
        		$rootScope.$broadcast('title', 'Schüler Anlegen');
        		$scope.current.lessonType = '1.5';
        		$scope.current.lessionInterval = 7;
        		$scope.current.active = true;
        		$scope.current.price = 25.0;
        		setTimeout(function() {
        			$('.datepicker').datetimepicker('date', new Date());
        		});
			} else if ($routeParams.id) {
				$rootScope.$broadcast('title', $scope.current.firstName + ' ' + $scope.current.lastName);
				setTimeout(function() {
					$('.datepicker').datetimepicker('date', new Date($scope.current.lessonStartDate));
					$scope.current.lessonType += '';
					$scope.current.teacher += '';
					$scope.current.teacherSubstitute += '';					
				});
				$('.datepicker').datetimepicker('date', new Date($scope.current.lessonStartDate));
				$scope.current.lessonType += '';
				$scope.current.teacher += '';
				$scope.current.teacherSubstitute += '';
			} else {
				$rootScope.$broadcast('title', 'Schülerübersicht');
			}
        };
        
        var load = function() {
            $scope.data = dataService.get();
            $scope.current = dataService.getById('students', $routeParams.id) || {};
            if (!$scope.current.teacher) {
            	if ($scope.data.teachers && $scope.data.teachers.length > 0) {
            		$scope.current.teacher = $scope.data.teachers[0].id;
            	}
            }
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
		 * Remove a student
		 *
		 * @param id The ID of the student
		 */
        $scope.remove = function($event, id) {
            // Schüler löschen
            dataService.removeById('students', id, function() {
            	load();
            });
            $event.preventDefault();
        };

        /**
         * Save Student/Add Student
         */
        $scope.save = function() {        	
        	var date = Date.parse($(".datepicker").datetimepicker("date").toDate());
        	$scope.current.lessonStartDate = date;
        	if ($scope.current.teacherSubstitute == ''
				|| $scope.current.teacherSubstitute == 'null'
			) {
				$scope.current.teacherSubstitute = null;
			}
        	if ($routeParams.id == 'add') {
				var id = dataService.add('students', $scope.current, function(current) {
					$location.path('/students/');
				});
        	} else {
        		dataService.updateById('students', $scope.current.id, $scope.current, function() {
                	load();
                	$location.path('/students/');
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
