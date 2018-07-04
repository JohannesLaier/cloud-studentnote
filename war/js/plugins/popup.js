var Popup = function(params) {
	var t = this;
	
	var modal;
	var popup;
	
    /**
     * Creates a new popup.
     *
     */	
	this.show = function() {
		$.get(params.tpl, function(html) {
			modal = $('<div class="modal"></div>');
			modal.click(function() {
				t.close();
			});

			popup = $('<div class="popup"></div>');
			var header = $('<div class="header">'+params.header+'<div>');
			var content = $('<div class="content">'+html+'</div>');
			var buttonClose = $('<button>Schließen</button>');
			buttonClose.click(function() {
				t.close();
			});
			var buttonOk = $('<button>Ok</button>');
			buttonOk.click(function() {
				if (typeof params.callback == 'function') {
					params.callback(content);
				}
				t.close();
			});

			popup.append(header);
			popup.append(content);
			popup.append(buttonClose);
			popup.append(buttonOk);
			
			$(document.body).append(modal);
			$(document.body).append(popup);
			
			popup.css("margin-left", $(popup).width() / -2);
			popup.css("margin-top", $(popup).height() / -2);
		});
	};
	
    /**
     * Closes the created popup.
     *
     */	
	this.close = function() {
		modal.remove();
		popup.remove();
	};
};


/**
Example Code
var popup = new Popup({
	header : 'Header',
	content : '<input type="text" style="width: 500px !important;"></input>'
});
popup.show();*/