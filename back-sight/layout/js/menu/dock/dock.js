$(document).ready(function() {
  $('#dock-menu .dock-top').Fisheye({
    maxWidth: 50,
    items: 'a',
    itemsText: 'span',
    container: '.dock-container',
    itemWidth: 40,
    proximity: 90,
    halign : 'center'
  });
  
  $('#dock-menu .dock-bottom').Fisheye({
    maxWidth: 60,
    items: 'a',
    itemsText: 'span',
    container: '.dock-container',
    itemWidth: 40,
    proximity: 80,
    alignment : 'left',
    valign: 'bottom',
    halign : 'center'
  });
});