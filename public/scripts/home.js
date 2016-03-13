	$(document).ready(function(){
$(".sld").not(".active").hide();

$(".typed-cursor").hide();

$("#words").typed({
	strings: [">> sudo npm install <br> >> node app.js"],
	typeSpeed: 80,
	loop: true,
	contentType: 'html'
});

        //                    d3.select("mac") 
        //                 .attr("viewBox", "0 0 300 500")
        // .attr("preserveAspectRatio", "xMidYMid meet")

setTimeout(function(){
    $(".sld #one").hide();
  $(".sld #two").show();
}, 3000)

setTimeout(function(){
    $(".sld #two").hide();
  $(".sld #three").show();
}, 3000);



$('.btn').click(function() {
var id = $(this).attr("href");
$(".sld").hide();
$(id).show();

    $('.active').removeClass('active');
    $(this).addClass("active");
});


            buildTree(treeData, "#syntaxTree");
	 
	});





   function buildTree(treeData, treeContainerDom) {
                var width = 500,
                 height = 350;

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
                        return "75%";
                    })
                        .attr("viewBox", "0 0 500 500")
        .attr("preserveAspectRatio", "xMidYMid meet")
                  .append("g")
                    .attr("transform", "translate(" + 0 + "," + 20 + ")");
                root = treeData;

                update(root);
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
                      .on("click", nodeclick);
                    nodeEnter.append("circle")
                     .attr("r", 4)
                        .attr("stroke", function (d) { return d.children || d._children ? "steelblue" : "#00c13f"; })
                        .style("fill", function (d) { return d.children || d._children ? "lightsteelblue" : "#fff"; });
                 
                    //set Depth
                    nodes.forEach(function(d) { d.y = d.depth * 40; });

                    nodeEnter.on("mouseover", function(d, i){
                      if(!d.text){
                        d3.select(this).append("circle")
                              .attr("r", 12)
                              .style("fill", "steelblue")
                              .style("opacity", .2)
                              .attr("class", function(d, i){
                                return "ntcircle" + i;
                              })


                         d3.select(this).append("text")
                              .attr("y", function(d){ return 0})
                              .attr("x", function(d){return -10})
                              .style("font-size", "1vw")
                              .text(function(d){ return d.type;})
                               .attr("class", function(d, i){
                                return "nttext" + i;
                              })
                            }

                      });
                    nodeEnter.on("mouseout", function(d, i){

                       d3.select(".ntcircle" + i).remove("circle");
                        d3.select(".nttext" + i).remove();

                      });


                    nodeEnter.append("text")
                        .attr("y", function (d) {
                            return d.children || d._children ? -10 : 10;
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

                      // nodeLabels.append("text")
                      //   .attr("y", function (d) {
                      //       return d.children || d._children ? -9 : 9;
                      //   })
                      //   .attr("dy", ".35em")
                      //   .attr("text-anchor", "middle")
                      //   .text(function (d) { return d.names; })
                      //   .style("fill-opacity", 1e-6);


                    update(d);
                }
            }

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






       