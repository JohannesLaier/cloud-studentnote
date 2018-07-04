var Loading = function() {
	var t = this;
	
	var element;
	
	
	/**
	 * Initalizes the loading indicator
	 */
	var init = function() {
		element = $('<div class="loading"></div>');
		$('body').append(element);
	};
	
	/**
	 * Shows the loading indicator
	 */
	this.show = function() {
		element.show();
	};
	
	/**
	 * Hides the loading indicator
	 */
	this.hide = function() {
		element.hide();
	};

	init();
};