define([
  'knockout'
], function(ko){
  'use strict';
  // represent a single task item
  var Task_old = function( title, running ) {
    this.title = ko.observable( title );
    this.running = ko.observable( running );
    this.editing = ko.observable( false );
  };
  return Task_old;
});