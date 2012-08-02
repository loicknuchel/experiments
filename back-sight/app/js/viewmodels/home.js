define([
  'knockout',
  'config/global',
  'models/User',
  'models/Task',
  'knockout-postbox'
], function(ko, g, User, Task){
  'use strict';
  // our main datas model
  var ViewModel = function() {
    var self = this;
    
    /*
      Lors de la synchronisation, c'est le dernier déclaré qui donne la valeur initiale. 
      Ici c'est celui-ci (car le widget home est après le widget settings dans le html).
      Il est donc nécessaire de passer le initUser depuis les settings jusqu'ici pour que l'application soit correctement initialisée.
    */
    self.curUser = ko.observable().syncWith(g.topic.curUser, true);
    
    self.runningTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return task.status() == g.model.task.status.run;
        });
      }
    }, self);
    self.waitingTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return task.status() == g.model.task.status.wait;
        });
      }
    }, self);
    self.doneTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return task.status() == g.model.task.status.done;
        });
      }
    }, self);
    
    // fields
    self.newTaskNameField = ko.observable();
    
    self.addTask = function() {
      var newTaskNameField = self.newTaskNameField().trim();
      if ( newTaskNameField ) {
        self.curUser().tasks.push( new Task({ name:newTaskNameField }) );
        self.newTaskNameField( '' );
      }
    };
    
    self.deleteTask = function( task ) {
      self.curUser().tasks.remove( task );
    };
    
    self.startTask = function( task ) { task.status(g.model.task.status.run); };
    self.stopTask = function( task ) { task.status(g.model.task.status.wait); };
    self.finishTask = function( task ) { task.status(g.model.task.status.done); };
    self.archiveTask = function( task ) { task.status(g.model.task.status.archive); };
    
    
    
    // to display KO viewmodel content !
    self.plainText = ko.computed(function(){
      return ko.toJSON({user:self.curUser()}, null, 2);
    });
    
  };
  return ViewModel;
});