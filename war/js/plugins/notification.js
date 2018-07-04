var Notification = function(text) {
	var t = this;

	var element;
	var speed = 1000;

	/**
	 * Initializes a notification
	 * 
	 * @param text Text of the notification
	 */
	var init = function(text) {
		element = $('<div class="notification"></div>');
		element.append(text);
		$('body').append(element);

		t.show();
		setTimeout(function() {
			t.hide();
		}, 5 * 1000);
	};

	/**
	 * Shows the Notification
	 * 
	 * @param speed How fast the notification should be displayed
	 */
	this.show = function(speed) {
		element.fadeIn(speed);
	};

	/**
	 * Hides the notification
	 * 
	 */
	this.hide = function() {
		element.fadeIn(speed, function() {
			$(this).remove();
		});
	};

	init(text);
};