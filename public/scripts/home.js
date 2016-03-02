	$(document).ready(function(){
	console.log("getting ehre/!?!");
 var mouseX, mouseY;
	  var ww = $( window ).width();
	  var wh = $( window ).height();
	  var moveX, moveY;
	  $('#main-header').mousemove(function(e){
	    mouseX = e.pageX;
	    mouseY = e.pageY;
	    moveX = ((4 * mouseX) / 87) + 40;
	    moveY = ((4 * mouseY) / 87) + 50;
	    $("#main-header").css({"background-position": moveX + "%" + moveY + "%"});
	  });

	 
	});
