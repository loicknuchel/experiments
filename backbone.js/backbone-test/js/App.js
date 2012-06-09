define(["app/widget/UserWidget"], function(UserWidget) {
	// can't call .caller property in strict mode !!
	function App(){
		// can't instantiate a singleton !
		if (App.caller !== App.getInstance) {
			throw new Error("This object (App) cannot be instanciated");
			return null;
		}
		
		function start(){
			console.log('start App');
		}
		
		function startUserWidget(block){
			var uw = new UserWidget(block);
			uw.start();
		}
		
		function startHighlight(block){
			// nothing to do !
		}
		
		return {
			start : start,
			startUserWidget : startUserWidget,
			startHighlight : startHighlight
		};
	}
	
	// singleton initialisation
	App.instance = null;
	App.getInstance = function () {
		if (this.instance === null) {
			this.instance = new App();
		}
		return this.instance;
	};
	return App;
});