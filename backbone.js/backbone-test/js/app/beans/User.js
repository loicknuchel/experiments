
define(["libs/underscore"],
	function (_) {
		'use strict';
		function User(name){
			var id = null;
			this.name = name || 'Default name';
			this.toString = function(){
				return 'User [name:'+name+']';
			}
			this.getId = function(){
				if(id == null){id = _.uniqueId('user_');}
				return id;
			}
		}
		
		return User;
	}
);