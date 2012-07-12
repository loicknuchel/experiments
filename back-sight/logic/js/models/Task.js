define([
  'knockout',
  'models/Run'
], function(ko, Run){
  'use strict';
  // represent a single task item
  var Task = function( title, runs, running, archive, done ) {
    var self = this;
    self.title = ko.observable( title );    // String
    self.editing = ko.observable( false );  // Boolean
    self.archive = ko.observable( archive );// Boolean
    self.done = ko.observable( done );      // Boolean
    
    self.runs = ko.observableArray( ko.utils.arrayMap( runs || [] , function( run ) { // Run[]
      return new Run( run.start, run.stop );
    }) );
    
    self._running = ko.observable( running );  // Boolean
    self.running = ko.computed({
      read: function(){
        var ret = self._running() && !self.archive() && !self.done();
        if(ret == false){
          self._running(false);
          // TODO problem : timer is not updated when a task stop running because of it is put done or archive
        }
        return ret;
      },
      write: function(value){
        if(value == true){
          self._running(true);
          self.archive(false);
          self.done(false);
          self.runs.push( new Run() );
        } else {
          self._running(false);
          if(self.runs().length > 0){
            self.runs()[self.runs().length-1].stop( new Date() );
          }
        }
      }
    });
    
    self.started = ko.computed(function(){
      if(self.running() == true) {
        return self.runs()[self.runs().length-1] || {start:function(){}};
      } else {
        return {start:function(){}};
      }
    });
    self.runedtime = ko.computed(function(){
      var total = 0;
      ko.utils.arrayMap( self.runs(), function(run){
        if(run.stop()){
          total += run.stop() - run.start();
        } else {
          // TODO : compter le temps écoulé entre le début et maintenant
          // total += new Date() - run.start();
        }
      });
      return total;
    });
  };
  return Task;
});