	$(document).ready(function(){

$(".typed-cursor").hide();

$("#words").typed({
	strings: [">> sudo npm install <br> >> node app.js"],
	typeSpeed: 80,
	loop: true,
	contentType: 'html'
});

$( window ).resize(function() {
  var pos = $("#mac").position();
  $("#words").css("left", pos.left + 20).css("top", pos.top + 30);
});




//TODO: change to add hover effects for the head div

$("#imgHolder").hover(function(){
	$("#headPic").css("opacity", '.75');
		$("#imgHolder").css("opacity", '.85');

}, function(){
		$("#headPic").css("opacity", '.87');
				$("#imgHolder").css("opacity", '1');

})

$("#headPic").hover(function(){
		$("#headPic").css("opacity", '.75');

	$("#imgHolder").css("opacity", '.85');
}, function(){
			$("#headPic").css("opacity", '.87');

		$("#imgHolder").css("opacity", '1');

})

	// makeTree();

            buildTree(treeData, "#syntaxTree");
	 
	});



// function makeTree(){
// 	var treeData = [
//   {
//     "name": "S",
//     "parent": "null",
//     "children": [
//       {
//         "name": "NP1",
//         "parent": "S",
//         "children": [
//           {
//             "name": "N",
//            	"text": "Rekha",
//             "parent": "NP1"
//           }
//         ]
//       },
//       {
//         "name": "VP",
//         "parent": "S",
//         "children": [
//         	  {
//             "name": "V",
//             "text": "loves",
//             "parent":"VP"
//           }
//         ]
//       }
//     ]
//   }
// ];

// var width = 500,
// height = 500;
	
// var i = 0;

// var tree = d3.layout.tree()
// 	.size([height, width]);

// // var diagonal = d3.svg.diagonal()
// // 	.projection(function(d) { return [d.x, d.y]; });

// var line = d3.svg.line()
//                  .x( function(point) { return point.lx; })
//                  .y( function(point) { return point.ly; });
// function lineData(d){
//     // i'm assuming here that supplied datum 
//     // is a link between 'source' and 'target'
//     var points = [
//         {lx: d.source.x, ly: d.source.y},
//         {lx: d.target.x, ly: d.target.y}
//     ];
//     return line(points);
// }


// var svg = d3.select("#syntaxTree").append("svg")
// 	.attr("width", width)
// 	.attr("height", height)
//   .append("g");

// root = treeData[0];
  
// update(root);

// function update(source) {

//   // Compute the new tree layout.
//   var nodes = tree.nodes(root).reverse(),
// 	  links = tree.links(nodes);

//   // Normalize for fixed-depth.
//   nodes.forEach(function(d) { d.y = d.depth * 50; });

//   // Declare the nodes…
//   var node = svg.selectAll("g.node")
// 	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

//   // Enter the nodes.
//   var nodeEnter = node.enter().append("g")
// 	  .attr("class", "node")
// 	  .attr("transform", function(d) { 
// 		  return "translate(" + d.x + "," + d.y + ")"; });

//   nodeEnter.append("circle")
// 	  .attr("r", 10)
// 	  .style("fill", "#fff");

//   nodeEnter.append("text")
// 	  .attr("y", function(d) { 
// 		  return d.children || d._children ? -18 : 18; })
// 	  .attr("dy", ".35em")
// 	  .attr("text-anchor", "middle")
// 	  .text(function(d) { return d.name; })
// 	  .style("fill-opacity", 1);

//   // Declare the links…
//   var link = svg.selectAll("path.link")
// 	  .data(links, function(d) { return d.target.id; });

//   // Enter the links.
//   link.enter().insert("path", "g")
// 	  .attr("class", "link")
// 	  .attr("d", lineData);

// }



   function buildTree(treeData, treeContainerDom) {
                var margin = { top: 30, right: 20, bottom: 20, left: 20 };
                var width = 360 - margin.right - margin.left;
                var height = 220 - margin.top - margin.bottom;

                var i = 0, duration = 750;
                var tree = d3.layout.tree()
                    .size([width, height]);
                var diagonal = d3.svg.diagonal()
                    .projection(function (d) { return [d.x, d.y]; });
                var svg = d3.select(treeContainerDom).append("svg")
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                root = treeData;

                update(root);
                function update(source) {
                    // Compute the new tree layout.
                    var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);
                    // Normalize for fixed-depth.
                    nodes.forEach(function (d) { d.y = d.depth * 100; });

                    // Declare the nodes…
                    var node = svg.selectAll("g.node")
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });
                    // Enter the nodes.
                    var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function (d) {
                            return "translate(" + source.x0 + "," + source.y0 + ")";
                        })
                      .on("click", nodeclick);
                    nodeEnter.append("circle")
                     .attr("r", 4)
                        .attr("stroke", function (d) { return d.children || d._children ? "steelblue" : "#00c13f"; })
                        .style("fill", function (d) { return d.children || d._children ? "lightsteelblue" : "#fff"; });
                 
                    //set Depth
                    nodes.forEach(function(d) { d.y = d.depth * 35; });


                    nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? -9 : 9;
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
                        .attr("r", 3)
                        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });
                    nodeUpdate.select("text")
                        .style("fill-opacity", 1);


                    // Transition exiting nodes to the parent's new position.
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                        .remove();
                    nodeExit.select("circle")
                        .attr("r", 5);
                    nodeExit.select("text")
                        .style("fill-opacity", 1e-6);
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
            }

            var treeData = {
    "name": "S",
    "parent": "null",
    "children": [
      {
        "name": "NP1",
        "parent": "S",
        "children": [
          {
            "name": "N",
             "text": "Rekha",
            "parent": "NP1"
          }
        ]
      },
      {
        "name": "VP",
        "parent": "S",
        "children": [
           {
            "name": "V",
            "text": "loves",
            "parent":"VP"
          },
          
            {
            "name": "NP2",
            "parent":"VP",
            "children": [
              {
                "name":"NP3",
                "parent":"NP2",
                "children": [
                {
                  "name": "D",
                  "text":"the",
                  "parent": "NP3"
                },
                {
                  "name":"N",
                  "text": "logic",
                  "parent":"NP3"
                }

                ]
              },
              {
                "name":"PP",
                "parent": "NP2",
                "children": [
                  {
                    "name": "P",
                    "text":"of",
                    "parent": "PP"
                  },
                  {
                    "name": "N",
                    "parent": "PP",
                    "text": "language"
                  }
                ]
              }
            ]
          }
          ]
        }
        ]
      }






       