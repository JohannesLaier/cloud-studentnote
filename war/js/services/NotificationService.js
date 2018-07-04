angular.module('services')
/**
 * Provides functions concerning notification management.
 *
 */
	.factory('NotificationService', [function () {
		return {
			add: function() {
				new Notification('Erfolgreich angelegt.');
			},
			
			update: function(type, entry) {
				new Notification('Erfolgreich aktuallisiert.');
			},
			
			remove: function(type, id) {
				new Notification('Erfolgreich gelöscht.');
			},
		};
	}])
;
