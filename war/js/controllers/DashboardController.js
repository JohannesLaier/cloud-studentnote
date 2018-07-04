angular.module('controllers')
	/**
	 * Controller for dashboard page
	 *
	 * @param $scope Injected $scope (AngularJS provided service)
	 * @param dataService Injected DataService
	 */
	.controller('DashboardController', ['$scope', '$filter', '$routeParams', '$rootScope', 'DataService', function($scope, $filter, $routeParams, $rootScope, dataService) {
		$scope.data = dataService.get();
		$scope.current = dataService.getById('students', $routeParams.id) || {};
		$scope.notes = dataService.getByField('notes', 'student', $routeParams.id);
		$scope.comment = '';
		$scope.duration = ($scope.current.lessonType + '');
		$scope.lesson;

		var init = function() {
        	$('.datepicker').datetimepicker({
        	    locale: 'de'
        	});
    		$('.datepicker').datetimepicker('date', new Date());
        	if ($routeParams.id) {
				$rootScope.$broadcast('title', $scope.current.firstName + ' ' + $scope.current.lastName);
			} else {
				$rootScope.$broadcast('title', 'Dashboard');
			}
        };

		var load = function() {
			$scope.students = [];
			$scope.students = $scope.students.concat(dataService.getByField('students', 'teacher', $scope.data.user.id));
			$scope.students = $scope.students.concat(dataService.getByField('students', 'teacherSubstitute', $scope.data.user.id));
			$scope.current = dataService.getById('students', $routeParams.id) || {};
			$scope.notes = dataService.getByField('notes', 'student', $routeParams.id);
			$scope.duration = ($scope.current.lessonType + '');
			loadLessons();
			init();
		};

		var loadLessons = function() {
			var lessons = dataService.getByField('lessons', 'student', $routeParams.id);
			lessons = $filter('orderBy')(lessons, 'date', true);
			var tmp = {};
			for (let id in lessons) {
				let lesson = lessons[id];
				let date = new Date(lesson.date);
				let group = $filter('date')(lesson.date, 'MMMM yyyy');
				if (!tmp[group]) {
					tmp[group] = [];
				}
				tmp[group].push(lesson);
			}
			$scope.lessons = tmp;
		};

		$scope.addLesson = function() {
			var date = Date.parse($(".datepicker").datetimepicker("date").toDate());
			if (!date || !$scope.duration) {
				alert("Bitte geben Sie ein Datum und eine länge an");
				return;
			}
			var lesson = {
				teacher : $scope.data.user.id,
				student : $scope.current.id,
				date : date,
				length : $scope.duration
			};
			dataService.add('lessons', lesson, function(current) {
            	load();
            });
		};
		
		$scope.removeLesson = function(id) {
			dataService.removeById('lessons', id, function() {
            	load();
            });
		};

		$scope.addNote = function() {
			var note = {
				teacher : $scope.data.user.id,
				student : $scope.current.id,
				date : (new Date()).getTime(),
				note : $scope.comment
			};
			dataService.add('notes', note, function(current) {
            	load();
            	$scope.comment = '';
            });
		};
		
		$scope.removeNote = function(id) {
			dataService.removeById('notes', id, function() {
            	load();
            });
		};

		dataService.load(function() {
			load();
		});
	}])
;