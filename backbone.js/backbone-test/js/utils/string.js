
define(function () {
	'use strict';
	function isEmpty(s){
		if(s){return s === '';}
		return true;
	}
	
    return {
        isEmpty: isEmpty,
        isNotEmpty: function(s){return !isEmpty(s);}
    }
});
