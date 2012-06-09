require.config({
	shim: {
    'libs/jquery': {
      exports: '$'
    },
    'libs/mustache': {
      exports: 'Mustache'
    },
    'libs/underscore': {
      exports: '_'
    }
	}
});

require(["libs/jquery", "App"], 
	function($, App) {
		'use strict';
		$(function() {
			var app = App.getInstance();
			app.start();
			
			$('.require-block').each(function(){
				var name = $(this).attr('data-require');
				if(name === 'user-widget'){
					app.startUserWidget($(this));
				} else if(name === 'highlight-widget'){
					app.startHighlight($(this));
				} else {
					alert('unknown require-block : '+name);
				}
			});
		});
	}
);
