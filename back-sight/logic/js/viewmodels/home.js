define([
  'knockout',
  'config/global',
  'models/User',
  'models/Task'
], function(ko, g, User, Task){
  'use strict';
  /* TODO
    - see models/Task.js
    - supprimer/renommer un user
    - renommer une tache
  */
  
  // our main view model
  var ViewModel = function( view ) {
    var self = this;
    
    // beans
    self.users = ko.observableArray( ko.utils.arrayMap( view.users, function( user ) {
      return new User( user.name, user.tasks, user.sync );
    }));
    // set the selected user to current iser
    self.curUser = ko.observable( (function(users, selected){
        if(users && users.length > 0){
          for(var i in users){
            if(users[i].name() == selected){ return users[i]; }
          }
          return users[0];
        }
      })(self.users(), view.selected) );
    
    self.runningTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return task.running();
        });
      }
    }, self);
    self.waitingTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return !task.running() && !task.archive() && !task.done();
        });
      }
    }, self);
    self.archiveTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return !task.running() && task.archive();
        });
      }
    }, self);
    self.doneTasks = ko.computed(function() {
      if(self.curUser()){
        return ko.utils.arrayFilter(self.curUser().tasks(), function(task) {
          return task.done();
        });
      }
    }, self);
    
    // fields
    self.addUserField = ko.observable();
    self.addTaskField = ko.observable();
    
    
    // methods
    self.addUser = function() {
      var addUserField = self.addUserField().trim();
      if ( addUserField ) {
        self.users.push( new User( addUserField, [], false ) );
        self.addUserField( '' );
      }
    };
    
    self.addTask = function() {
      var addTaskField = self.addTaskField().trim();
      if ( addTaskField ) {
        self.curUser().tasks.push( new Task( addTaskField, [], false, false, false ) );
        self.addTaskField( '' );
      }
    };
    
    self.deleteTask = function( task ) {
      self.curUser().tasks.remove( task );
    };
    

    // internal computed observable that fires whenever anything changes in our tasks
    ko.computed(function() {
      localStorage.setItem( g.localStorageUser, ko.toJSON( {selected:self.curUser() ? self.curUser().name : undefined, users:self.users} ) );
    }).extend({
      throttle: 500
    }); // save at most twice per second
    
    self.plainText = ko.computed(function(){
      return ko.toJSON({selected:self.curUser() ? self.curUser().name : undefined, users:self.users}, null, 2);
    });
    
  };
  return ViewModel;
});