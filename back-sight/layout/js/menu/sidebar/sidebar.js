$(document).ready(function() {  
  var block = $('#sidebar-menu');

  //Background color, mouseover and mouseout
  var colorOver = '#31b8da';
  var colorOut = '#1f1f1f';

  //Padding, mouseover
  var padLeft = '20px';
  var padRight = '20px'
   
  //Default Padding
  var defpadLeft = block.find('.sidebar li a').css('paddingLeft');
  var defpadRight = block.find('.sidebar li a').css('paddingRight');
   
  //Scroll the menu on mouse move above the #sidebar layer
  block.find('.sidebar-container').mousemove(function(e) {
    //Sidebar Offset, Top value
    var s_top = parseInt($(this).offset().top);       
     
    //Sidebar Offset, Bottom value
    var s_bottom = parseInt($(this).height() + s_top);
 
    //Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
    var mheight = parseInt($(this).find('.sidebar li').height() * $(this).find('.sidebar li').length);
         
    //Calculate the top value
    //This equation is not the perfect, but it 's very close    
    var top_value = Math.round(( (s_top - e.pageY) /100) * mheight / 2)
     
    //Animate the #menu by chaging the top value
    $(this).find('.sidebar').animate({top: top_value}, { queue:false, duration:500});
  });
       
  //Animate the LI on mouse over, mouse out
  block.find('.sidebar-container .sidebar li').click(function () {   
    //Make LI clickable
    window.location = $(this).find('a').attr('href');
  }).mouseover(function (){
    //mouse over LI and look for A element for transition
    $(this).find('a')
    .animate( { paddingLeft: padLeft, paddingRight: padRight}, { queue:false, duration:100 } )
    .animate( { backgroundColor: colorOver }, { queue:false, duration:200 });
  }).mouseout(function () {
    //mouse oout LI and look for A element and discard the mouse over transition
    $(this).find('a')
    .animate( { paddingLeft: defpadLeft, paddingRight: defpadRight}, { queue:false, duration:100 } )
    .animate( { backgroundColor: colorOut }, { queue:false, duration:200 });
  }); 
});