define([
  'knockout',
  'models/Task'
], function(ko, Task){
  'use strict';
  // represent a single task item
  var User = function( name, tasks, sync ) {
    var self = this;
    self.name = ko.observable( name || 'first user' );        // String
    self.tasks = ko.observableArray( ko.utils.arrayMap( tasks || [] , function( task ) { // Task[]
      return new Task( task.title, task.runs, task.running, task.archive, task.done );
    }) ); 
    self.sync = ko.observable( sync || false );       // Boolean
    self.runedtime = ko.computed(function(){
      var total = 0;
      ko.utils.arrayMap( self.tasks(), function(task){
        total += task.runedtime();
      });
      return total;
    });
  };
  return User;
});