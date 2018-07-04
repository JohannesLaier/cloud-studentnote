angular.module('services')
/**
 * Provides functions concerning data management.
 *
 * @param $location Injected $location (AngularJS provided service)
 * @param $interpolate Injected $interpolate (AngularJS provided service)
 * @param restService Injected RestService
 */
	.factory('DataService', ['RESTService', 'NotificationService', function (restService, notificationService) {
		var data = {
			user : {},
			school : {},
			school : {},
			students : [],
			classes : [],
			teachers : [],
			notes : [],
			events : []
		};
		
		/**
		 * Data initialize state
		 */
		var init  = false;

		var service = {
			/**
			 * Gets the main data object.
			 *
			 * @returns {Object} The main data object
			 */
			get: function() {
				return data;
			},

			/**
			 * Sets the main data object without creating a new object.
			 *
			 * @param dataToStore The data from the server
			 */
			set: function(dataToStore) {
				data.students = dataToStore.students;
				data.teachers = dataToStore.teachers;
				data.lessons = dataToStore.lessons;
				data.notes = dataToStore.notes;
				data.user = dataToStore.user;
				data.school = dataToStore.school;
				data.events = dataToStore.events;
				data.school = dataToStore.school;
			},
			/**
			 * Adds a new entry.
			 *
			 * @param type The type of the new entry
			 * @param entry The new entry
			 */
			add : function(type, entry, callback) {
				restService.add(type, entry).success(function(data) {
					service.set(data);
					if (typeof callback == "function") {
						callback(data.current);
					}
					notificationService.add();
				});
			},
			/**
			 * Updates an entry.
			 *
			 * @param type The type of the entry to be updated
			 * @param id The ID of the entry to be updated
			 * @param entry The new entry
			 */
			updateById : function(type, id, entry, callback) {
				restService.update(type, entry).success(function(data) {
					service.set(data);
					if (typeof callback == "function") {
						callback();
					}
					notificationService.update();
				});
			},
			/**
			 * Gets an entry by ID
			 *
			 * @param type The type of the wanted entry
			 * @param id The id of the wanted entry
			 * @returns {entry} The wanted entry
			 */
			getById : function(type, id) {
				for (var key in data[type]) {
					var entry = data[type][key];
					if (entry.id == id) {
						return entry;
					}
				}
			},
			/**
			 * Gets an entry by Field
			 *
			 * @param type The type of the wanted entry
			 * @param field The field of the entry you want to compare
			 * @param value The value you want to compare with field
			 * @returns {ID} The list of entries with equal field values
			 */
			getByField : function(type, field, value) {
				var list = [];
				for (var key in data[type]) {
					var entry = data[type][key];
					if (entry[field] == value) {
						list.push(entry);
					}
				}
				return list;
			},
			/**
			 * Removes an entry by ID
			 *
			 * @param type The type of the entry
			 * @param id The ID of the entry
			 */
			removeById : function(type, id, callback) {
				restService.remove(type, id).success(function(data) {
					service.set(data);
					if (typeof callback == "function") {
						callback(data.current);
					}
					notificationService.remove();
				});
			},
			/**
			 * Sets the current user to new user
			 *
			 * @param user The user you want to copy
			 */
			setUser : function(user) {
				data.user = user;
				service.updateById('teachers', user.id, user);
			},
			
			/**
			 * Load all entry of the database.
			 * 
			 * @param callback Will be called on receiving data
			 */
			load : function(callback) {
				if (init) {
					callback();
				} else {
					restService.get().success(function(data) {
						if (!!data) {
							service.set(data);
							init = true;
							callback();
						} else {
							window.location.href = 'login.html';
						}
					}).error(function(data, status) {
						window.location.href = 'login.html';
					});
				}
			}
		};
		return service;
	}])
;
