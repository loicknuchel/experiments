// Author: Loïc Knuchel <loicknuchel@gmail.com>

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    knockout: 'libs/knockout-2.1.0',
    jquery: 'libs/jquery.min'
  }

});

require([
  'jquery',
  'knockout',
  'config/global',
  'viewmodels/home',
  'viewmodels/task',
  'extends/handlers',
  'extends/native'
], function($, ko, g, HomeViewModel, TaskViewModel){
  'use strict';
  var users = ko.utils.parseJson( localStorage.getItem( g.localStorageUser ) );
  ko.applyBindings( new HomeViewModel( users || [] ), document.getElementById('app') );
  
  
  // var app_view = new AppView();
  // check local storage for tasks
  var tasks = ko.utils.parseJson( localStorage.getItem( g.localStorageItem ) );

  // bind a new instance of our view model to the page
  ko.applyBindings( new TaskViewModel( tasks || [] ), document.getElementById('todoapp') );
});
