	$(document).ready(function(){
$(".sld").not(".active").hide();

$(".typed-cursor").hide();

$("#words").typed({
	strings: [">> sudo npm install <br> >> node server.js"],
	typeSpeed: 100,
	loop: true,
	contentType: 'html'
});
    var pixAdj = $("wrapper").outerHeight() * .05;
    var rAdj = $("wrapper").outerWidth() * .05;

      var l = $("#mac").position.left;
      var t = $("#mac").position.top;

   

   $( "#words" ).position({
        of: $( "#mac" ),
        my: "right"+rAdj+ " center",
        at: "center center" - pixAdj,
        within: "#mac"
      });

           $("#words").show();



var resizeTimer;

$(window).on('resize', function(e) {

  $("#words").hide();

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
  var pixAdj = $("wrapper").outerHeight() * .30;
    var rAdj = $("wrapper").outerWidth() * .05;

      var l = $("#mac").position.left;
      var t = $("#mac").position.top;

   
   $( "#words" ).position({
        of: $( "#mac" ),
        my: "right"+rAdj+ " center",
        at: "center center" - pixAdj,
        within: "#mac"
      });

           $("#words").show();
  }, 250);

});


$('.btn').hover(function() {
var id = $(this).attr("id");
console.log(id);
if(id == "linguist"){
$(".sld").hide();
$(".slides #" + id).show();

    $('.active').removeClass('active');
    $(this).addClass("active");
                buildTree(treeData, "#syntaxTree");

  } else{
$(".sld").hide();
$(".slides #" + id).show();

    $('.active').removeClass('active');
    $(this).addClass("active");

  }
});


	                           makeChart();
                            buildSeparator();

	});


 var treeData = {
    "name": "S",
    "type": "S",
    "parent": "null",
    "children": [
      {
        "name": "NP1",
        "type": "NP",
        "parent": "S",
        "children": [
          {
            "name": "N",
                    "type": "N",
             "text": "Rekha",
            "parent": "NP1"
          }
        ]
      },
      {
        "name": "VP",
                "type": "VP",
        "parent": "S",
        "children": [
           {
            "name": "V",
                    "type": "V",
            "text": "loves",
            "parent":"VP"
          },
          
            {
            "name": "NP2",
                    "type": "NP",
            "parent":"VP",
            "children": [
              {
                "name":"NP3",
                        "type": "NP",

                "parent":"NP2",
                "children": [
                {
                  "name": "D",
                          "type": "D",

                  "text":"the",
                  "parent": "NP3"
                },
                {
                  "name":"N",
                          "type": "N",

                  "text": "logic",
                  "parent":"NP3"
                }

                ]
              },
              {
                "name":"PP",
                        "type": "PP",

                "parent": "NP2",

                "children": [
                  {
                    "name": "P",
                            "type": "P",

                    "text":"of",
                    "parent": "PP"
                  },
                  {
                    "name": "NP4",
                            "type": "NP",

                    "parent": "PP",
                    "children": [
                      {
                        "name":"adj",
                                "type": "adj",

                         "text": "natural",
                         "parent": "NP4"
                      },
                      {"name": "NP5",
                              "type": "NP",

                        "parent":"NP4",
                        "children":[
                        {
                          "name":"N2",
                                  "type": "N",

                          "text":"language",
                          "parent":"NP5"
                        }

                        ]
                    }
                    ]
                  }
                ]
              }
            ]
          }
          ]
        }
        ]
      }



   function buildTree(treeData, treeContainerDom) {

          var collapsedNode;

              if($("#syntaxTree").has("svg")){
                $("#syntaxTree svg").remove();
              }
                var width = 400,
                 height = 800;

                var i = 0, duration = 750;
                var tree = d3.layout.tree()
                    .size([width, height]);

                var diagonal = d3.svg.diagonal()
                    .projection(function (d) { return [d.x, d.y]; });

                var svg = d3.select(treeContainerDom).append("svg")
                    .attr("width", function(){
                        return "100%";
                    })
                    .attr("height", function(){
                        return "100%";
                    })
                        .attr("viewBox", "0 0 380 255")
                  .attr("preserveAspectRatio", "xMidYMid meet")
                  .append("g")
                    .attr("transform", "translate(" + 0 + "," + 20 + ")");
                root = treeData;

                update(root);
                



           // Toggle children on click.
                function nodeclick(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }

                    update(d);
                }


                function update(source) {


                    var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);

                    var node = svg.selectAll("g.node")
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });
                    

                    var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function (d) {
                            return "translate(" + source.x0 + "," + source.y0 + ")";
                        })
                      .on("click", function(d, i){
                           collapsedNode = d.name;
                          console.log(collapsedNode);
                          nodeclick(d);

                     

                       
                      });
                     nodeEnter.append("circle")
                                    .attr("r" , 4)
                        .attr("class", function(d, i){  return "circle" + d.name})
                        .attr("stroke", function (d) { return d.children || d._children ? "steelblue" : "#00c13f"; })
                        .style("fill", function (d) { return d.children || d._children ? "lightsteelblue" : "#fff"; });
                 
                    //set Depth
                    nodes.forEach(function(d) { d.y = d.depth * 35; });

                    nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? -11 : 11;
                        })
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .text(function (d) { return d.text; })
                        .style("fill-opacity", 1e-6);


                    // Transition nodes to their new position.
                    //horizontal tree
                    var nodeUpdate = node.transition()
                        .duration(duration)
                        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
                    nodeUpdate.select("circle")
                                    .attr("r" , 4)
                        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });
                    nodeUpdate.select("text")
                        .style("fill-opacity", 1);

                        if(collapsedNode){
                          d3.select(".circle" + collapsedNode)
                            .transition()
                            .duration(300)
                            .attr("r", 15)
                        // nodeEnter.append("text")
                        // .attr("y", function (d) {
                        //     return d.children || d._children ? -11 : 11;
                        // })
                        // .attr("dy", ".35em")
                        // .attr("text-anchor", "middle")
                        // .text(function (d) { return d.type; })
                        // .attr("class", function(){
                        //   return ntLabels;
                        // })

                        }


                    // Transition exiting nodes to the parent's new position.
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                        .remove();




                    // nodeExit.select("circle")
                     // .attr("r", function(d, i){ if( d3.select(this).classed("circle" + collapsedNode, true)) { return 10; } else { return 4;} })
                    // nodeExit.select("text")
                    //     .style("fill-opacity", 1e-6);
                    // Update the links…
                    // Declare the links…


                    var link = svg.selectAll("path.link")
                        .data(links, function (d) { return d.target.id; });
                    // Enter the links.
                    link.enter().insert("path", "g")
                        .attr("class", "link")
                        .attr("d", function (d) {
                            var o = { x: source.x0, y: source.y0 };
                            return diagonal({ source: o, target: o });
                        });


                    // Transition links to their new position.
                    link.transition()
                        .duration(duration)
                    .attr("d", diagonal);


                    // Transition exiting nodes to the parent's new position.
                    link.exit().transition()
                        .duration(duration)
                        .attr("d", function (d) {
                            var o = { x: source.x, y: source.y };
                            return diagonal({ source: o, target: o });
                        })
                        .remove();

                    // Stash the old positions for transition.
                    nodes.forEach(function (d) {
                        d.x0 = d.x;
                        d.y0 = d.y;
                    });

                }

     
            }

              




function makeChart(){
if($("#bars").has("svg")){
  $("#bars svg").remove();
}  

var width = 130,
height = 250;
  
var svg =  d3.select("#bars")
    .append("svg")

                .attr("width", function(){
                        return "100%";
                    })
                    .attr("height", function(){
                        return "100%";
                    })
                        .attr("viewBox", "0 0 160 100")
        .attr("preserveAspectRatio", "xMidYMid meet")
              .append("g")


svg.append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("height", 0)
   .attr("width", 40)
   .attr("id", "rect1")
         
 svg.append("rect")
   .attr("x", 45)
   .attr("y", 0)
   .attr("height", 0)
   .attr("width", 40)
    .attr("id", "rect2")

 
  svg.append("rect")
   .attr("x", 90)
   .attr("y", 0)
   .attr("height", 0)
   .attr("width", 40)
   .attr("id", "rect3")

  
    r1up();
  
}
  


function r1up(){
  d3.select("#rect1")
    .transition()
    .ease("linear")
    .duration(900)
    .delay(50)
    .attr("height", 50)
    .each("start", r2up)

}


function r2up(){
  d3.select("#rect2")
    .transition()
     .ease("linear")
    .duration(880)
    .attr("height", 150)
    .each("start", r3up)

  
}


function r3up(){
  d3.select("#rect3")
    .transition()
    .ease("linear")
    .duration(860)
    .attr("height", 250)
    .each("start", r3down)


}

function r3down(){
  d3.select("#rect3")
    .transition()
    .ease("linear")
    .duration(220)
   .delay(280)
    .attr("height", 0)
    .each("end", r2down)
}

function r2down(){
  d3.select("#rect2")
    .transition()
    .ease("linear")
    .duration(220)
    .attr("height", 0)
    .each("end", r1down)
}

function r1down(){
  d3.select("#rect1")
    .transition()
        .ease("linear")
    .duration(210)
    .attr("height", 0)
    .each("end", r1up)
}


function buildSeparator(){

  var w = 1000,
    h = 300;

var vertices = d3.range(5000).map(function(d) {
  return [Math.random() * w, Math.random() * h];
});

var delaunay = d3.geom.delaunay(vertices);

var svg = d3.select("#separator")
  .append("svg")
      // .attr("width", "100%")
      // .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid slice")
//    .attr("width", w)
//    .attr("height", h)
    .attr("viewBox", [0, 0, w, h].join(' '))

svg.append("g")
  .selectAll("path")
    .data(delaunay)
  .enter().append("path")
    .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
}


       