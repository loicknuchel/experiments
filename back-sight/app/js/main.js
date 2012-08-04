// Author: Loïc Knuchel <loicknuchel@gmail.com>

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    'jquery': 'libs/jquery-1.7.2.min',
    'jwerty': 'libs/jwerty',
    'bootstrap': 'libs/bootstrap/bootstrap.min',
    'knockout': 'libs/knockout-2.1.0',
    'knockout-postbox': 'libs/knockout-postbox'
  }

});

require([
  'jquery',
  'knockout',
  'config/global',
  'models/User',
  'viewmodels/settings',
  'viewmodels/home',
  'utils/Omnibox',
  'jwerty',
  'extends/handlers',
  'extends/native'
], function($, ko, g, User, SettingsViewModel, HomeViewModel, Omnibox){
  'use strict';
  
  var storage = ko.utils.parseJson( localStorage.getItem( g.storage.users ) );
      
  $('.'+g.widget.classes).each(function(){
    var name = $.trim($(this).attr(g.widget.attrName));
    
    if(name == 'settings-panel'){
    
      $(this).find('.panel-toggle .js-toggle').toggle(function(){
        $(this).parents('.js-top-panel').find('.panel').slideDown();
        $(this).find('i').removeClass('icon-cogs').addClass('icon-remove').css('color', 'red');
        return false;
      }, function(){
        $(this).parents('.js-top-panel').find('.panel').slideUp();
        $(this).find('i').removeClass('icon-remove').addClass('icon-cogs').removeAttr('style');
        return false;
      });
      
      ko.applyBindings( new SettingsViewModel( storage || {} ), $(this).get(0) );
      
    } else if(name == 'KO-main'){
      
      ko.applyBindings( new HomeViewModel(), $(this).get(0) );
      
      $(this).on('click', '.js-create-first-user', function(){
        $('.js-top-panel .js-toggle').click();
        $('.js-top-panel .js-create-user').focus();
      });
      
    } else {
      alert('unknown widget '+name);
    }
  });
  
  
  
  // toggle settings on f1 key
  jwerty.key('f1', function(){
    $('.js-top-panel .js-toggle').click();
    return false;
  });
  
  // on escape key close settings if they are open or focus omnibox
  jwerty.key('esc', function(){
    if($('.js-top-panel div.panel').css('display') == 'block'){
      $('.js-top-panel .js-toggle').click();
    } else {
      $('.omnibox input[type="text"]').focus();
      return false;
    }
  });
  
  // unfocus omnibox on press escape key
  $('.omnibox input[type="text"]').bind('keydown', jwerty.event('ctrl+space', function(){
    $(this).val(Omnibox.beautify($(this).val()));
    return false;
  }));
  
  
});
