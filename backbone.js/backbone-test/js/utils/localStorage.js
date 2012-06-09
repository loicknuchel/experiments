
define(function () {
	'use strict';
	function isLocalStorage(){
		return typeof localStorage != "undefined";
	}
	
	function get(key){
		if(isLocalStorage()){
			var obj = localStorage.getItem(key);
			if(obj != undefined){
				return JSON.parse(obj);
			}
		}
	}
	
	function set(key, obj){
		if(isLocalStorage()){
			localStorage.setItem(key, JSON.stringify(obj));
		}
	}
	
	function remove(key){
		if(isLocalStorage()){
			localStorage.removeItem(key);
		}
	}
	
    return {
      isLocalStorage: isLocalStorage,
      get : get,
      set : set,
      remove : remove
    }
});
