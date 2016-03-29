$(document).ready(function(){
zoomBurst();


startPositioning();
makeNav();
  homeBox()
  makeChart();

$(".typed-cursor").hide();

$("#words").typed({
  strings: [">> sudo npm install <br> >> node server.js"],
  typeSpeed: 100,
  loop: true,
  contentType: 'html'
});


var resizeTimer;

$(window).on('resize', function(e) {


  if($(window).innerWidth() < 860){

  var five = .15 * $("#headHolder").innerHeight();

var pos = $("#headHolder").position();

$("#headHolder img").css("top", pos.top + five)



} else {

var five = .12 * $("#headHolder").innerHeight();

var pos = $("#headHolder").position();

$("#headHolder img").css("top", pos.top + five)


}

$("#ghLink1").position({
  of: $("#twitter"),
        my: "right bottom",
        at: "right-13 bottom-5",
        collision: "none"
})

$("#ghLink2").position({
     of: $("#politics"),
        my: "right bottom",
        at: "right-13 bottom-5",
        collision: "none"
})



 $("#sbtt").position({
        of: $("#sunburst"),
        my: "left bottom",
        at: "left center",
        collision: "none"
      });

$("#syntaxTT").position({
  of: $(".wrapper"),
  my: "center top+15", 
  at: "center bottom",
  collision: "none"
})



});


//set home to active 
d3.select("#homeCircle").classed("activeCircle", true)
d3.select("#homeLbl").classed("scrollTextStyle", true)




                          
                             //delauney triangulation
                            // buildSeparator();

                 

  });


function startPositioning(){
  if($(window).innerWidth() < 860){
  var five = .15 * $("#headHolder").innerHeight();
var pos = $("#headHolder").position();
$("#headHolder img").css("top", pos.top + five)
} else {
var five = .12 * $("#headHolder").innerHeight();
var pos = $("#headHolder").position();
$("#headHolder img").css("top", pos.top + five)
}

$("#ghLink1").position({
  of: $("#twitter"),
        my: "right bottom",
        at: "right-13 bottom-5",
        collision: "none"
})

$("#ghLink2").position({
     of: $("#politics"),
        my: "right bottom",
        at: "right-13 bottom-5",
        collision: "none"
})

 $("#sbtt").position({
        of: $("#sunburst"),
        my: "left bottom",
        at: "left center",
        collision: "none"
      });

$("#ttClose").click(function(){
    $("#sbtt").hide();
})

$("#syntaxTT").position({
  of: $(".wrapper"),
  my: "center top+15", 
  at: "center bottom",
  collision: "none"
})





}




  function makeNav(){

    var navLine = d3.select("#navigation")
                          .append("g")
                          // .attr("viewBox", "0 0 1000 255")
                          // .attr("preserveAspectRatio", "xMidYMid meet")



var cx1 = d3.select("#homeCircle").attr("cx"),
cy1 = d3.select("#homeCircle").attr("cy");

var cx2 = d3.select("#aboutCircle").attr("cx"),
cy2 = d3.select("#aboutCircle").attr("cy");

var cx3 = d3.select("#projectsCircle").attr("cx"),
cy3 = d3.select("#projectsCircle").attr("cy");

var cx4 = d3.select("#contactCircle").attr("cx"),
cy4 = d3.select("#contactCircle").attr("cy");




navLine.append("text")
        .text("home")
        .attr("x", cx1 - 15)
        .attr("y", parseInt(cy1) + 5)
        .attr("class", "navText")
        .attr("id", "homeLbl")



        navLine.append("text")
        .text("about")
        .attr("x", cx2 - 15)
        .attr("y", parseInt(cy2) + 5)
        .attr("class", "navText")
        .attr("id", "aboutLbl")


   navLine.append("text")
        .text("projects")
        .attr("x", cx3 - 20)
        .attr("y", parseInt(cy3) + 5)
        .attr("class", "navText")
         .attr("id", "projectsLbl")

   navLine.append("text")
        .text("contact")
        .attr("x", cx4 - 20)
        .attr("y", parseInt(cy4) + 5)
        .attr("class", "navText")
         .attr("id", "contactLbl")



         d3.selectAll("circle")
            .on("click", function(){
              var id = d3.select(this).attr("id");
              var idshort = id.slice(0, -6);
            })

           d3.selectAll(".navText")
            .on("click", function(){
              var id = d3.select(this).attr("id");
              var idshort = id.slice(0, -3);
              console.log(idshort);
            })






//scrollhandling
var half = window.outerHeight/2;
var scrollBottom = $(window).scrollTop() + $(window).height();


$(document).scroll(function(){
    if($(this).scrollTop()>=$('#about').position().top - half){
      console.log("scrolllllll");
d3.selectAll("circle").classed("activeCircle", false);
d3.selectAll(".navText").classed("scrollTextStyle", false);


d3.selectAll("#aboutCircle").classed("activeCircle", true)
d3.selectAll("#aboutLbl").classed("scrollTextStyle", true)
    }
      if($(this).scrollTop()<=$('#about').position().top - half){


d3.selectAll("circle").classed("activeCircle", false);
d3.selectAll(".navText").classed("scrollTextStyle", false);


d3.selectAll("#homeLbl").classed("scrollTextStyle", true)

d3.selectAll("#homeCircle").classed("activeCircle", true)

      }

    if($(this).scrollTop()>=$('#projects').position().top - half){


d3.selectAll("circle").classed("activeCircle", false);
d3.selectAll(".navText").classed("scrollTextStyle", false);


d3.selectAll("#projectsLbl").classed("scrollTextStyle", true)

d3.selectAll("#projectsCircle").classed("activeCircle", true)

      }

          if($(this).scrollTop()>=$('#projects').position().top - half/5){


d3.selectAll("circle").classed("activeCircle", false);
d3.selectAll(".navText").classed("scrollTextStyle", false);


d3.selectAll("#contactLbl").classed("scrollTextStyle", true)

d3.selectAll("#contactCircle").classed("activeCircle", true)

      }

})
  }
