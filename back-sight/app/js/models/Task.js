define([
  'knockout',
  'config/global'
], function(ko, g){
  'use strict';
  // represent a single task item
  var Task = function( task ) {
    var self = this;
    if(g.debug && !task.name){
      throw 'task must have a name !';
    }
    
    self.name = ko.observable( task.name );
    self.description = ko.observable( task.description || '' );
    // self.commentaires;
    // self.runs;
    // self.tags;
    // self.priority;
    self.status = ko.observable( task.status || g.model.task.status.wait );
    self.created = ko.observable( task.created || new Date() );
    
    self.uiState = ko.observable( task.uiState || '' );
  };
  return Task;
});
