define([
  'knockout'
], function(ko){
  'use strict';
  // represent a single task item
  var Run = function( start, stop ) {
    this.start = ko.observable( start ? new Date(start) : new Date() );  // Date
    this.stop = ko.observable( stop ? new Date(stop) : undefined );                // Date
  };
  return Run;
});