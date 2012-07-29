define([
  'knockout'
], function(ko){
  'use strict';
  // represent an execution period for a task
  var Run = function( run ) {
    var self = this;
    self.start = ko.observable( run.start ? new Date(run.start) : new Date() );
    self.stop = ko.observable( run.stop ? new Date(run.stop) : undefined );
    self.comment = ko.observable( task.comment || '' );
  };
  return Run;
});
