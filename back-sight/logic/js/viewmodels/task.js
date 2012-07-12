define([
  'knockout',
  'config/global',
  'models/Task_old'
], function(ko, g, Task_old){
  'use strict';
  // our main view model
  var ViewModel = function( tasks ) {
    var self = this;
    
    // map array of passed in tasks to an observableArray of Task objects
    self.tasks = ko.observableArray( ko.utils.arrayMap( tasks, function( task ) {
      return new Task_old( task.title, task.running );
    }));
    
    self.runningTasks = ko.dependentObservable(function() {
      return ko.utils.arrayFilter(self.tasks(), function(task) {
        return task.running();
      });
    }, self);
    self.notRunningTasks = ko.dependentObservable(function() {
      return ko.utils.arrayFilter(self.tasks(), function(task) {
        return !task.running();
      });
    }, self);

    
    // store the new task value being entered
    self.current = ko.observable();
    
    
    
    // add a new task, when enter key is pressed
    self.add = function() {
      var current = self.current().trim();
      if ( current ) {
        self.tasks.push( new Task_old( current ) );
        self.current( '' );
      }
    };

    // edit an item
    self.editItem = function( item ) {
      item.editing( true );
    };

    // stop editing an item.  Remove the item, if it is now empty
    self.stopEditing = function( item ) {
      item.editing( false );
      if ( !item.title().trim() ) {
        self.remove( item );
      }
    };

    // remove a single task
    self.remove = function( task ) {
      self.tasks.remove( task );
    };

    // stop all running tasks
    self.stopRunnings = function() {
      ko.utils.arrayFilter(self.runningTasks(), function(task) {
        return task.running(false);
      });
    };

    // count of tasks that are not complete
    self.runningCount = ko.computed(function() {
      //return self.tasks().length - self.completedCount();
      return self.runningTasks().length;
    });

    // helper function to keep expressions out of markup
    self.getLabel = function( count ) {
      return ko.utils.unwrapObservable( count ) === 1 ? 'task' : 'tasks';
    };

    // internal computed observable that fires whenever anything changes in our tasks
    ko.computed(function() {
      // store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
      localStorage.setItem( g.localStorageItem, ko.toJSON( self.tasks ) );
    }).extend({
      throttle: 500
    }); // save at most twice per second
    
  };
  return ViewModel;
});