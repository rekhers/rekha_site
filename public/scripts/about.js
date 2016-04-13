

var json = {"name": "skills",
 "children": [
    //800
      {"name": "web development", 
      "children": [
      //600
        {"name": "front end",
      "children": [
          {"name": "html & templates", 
          "children": [
            {"name": "ejs", "size":50, "chY":[1, 1, 3, 4, 5]},
            {"name": "erb", "size":50, "chY": [1, 1, 4, 3, 3]},
            {"name": "Jade", "size":20, "chY": [1, 1, 2, 2, 3]},
            {"name": "Razor", "size":50, "chY": [1, 1, 1, 5, 4]}
          ]
        },
          {"name": "css", 
          "children": [
            {"name": "less", "size": 125, "chY": [1, 1, 3, 5, 5]},
            {"name": "scss", "size": 55, "chY": [1, 2, 5, 4, 4]}
          ]
        }, 
        {"name": "visualization", 
          "children": [
            {"name": "d3", "size": 150, "chY": [1, 1, 3, 4, 5]},
            {"name": "raphael", "size": 50, "chY": [1, 1, 2, 3, 3]},
            {"name": "bokeh", "size": 50, "chY": [1, 1, 2, 4, 3]}

          ]
        },
            {"name": "animation",
            "children":[
              {"name": "css", "size": 60, "chY": [1, 1, 2, 4, 5]},
              {"name": "SMIL", "size": 50, "chY": [1, 1, 2, 4, 4]}
            ]
          },
           {"name": "js frameworks",
           "children": [
            {"name": "Angular", "size": 50, "chY": [1, 1, 2, 3, 5]},
            {"name": "Backbone", "size": 70, "chY": [1, 1, 3, 5, 4]}
           ]
         },
           {"name": "responsive frameworks", 
            "children":[
              {"name": "bootstrap", "size": 100, "chY": [1, 1, 3, 5, 5]}
            ]
         },

             {"name": "task runners",
            "children":[
              {"name": "grunt", "size": 100, "chY": [1, 1, 1, 3, 4]}
            ]
         }
      ]
      },
       {"name": "server side", 
       "children": [
          {"name": "node.js", 
            "children": [
              {"name": "npm", "size": 70, "chY": [1, 1, 3, 4, 5]},
             {"name": "express", "size": 50, "chY": [1, 2, 4, 3, 4]}

            ]
        },
          {"name": "db", 
            "children": [
              {"name": "mongoDB", "chY": [1, 1, 3, 4, 5], "size": 50},
              {"name": "postgreSQL", "chY": [1, 1, 2, 4, 2], "size": 50},
              {"name": "mySQL", "chY": [1, 1, 2, 4, 3], "size": 30}
            ]
        },
           {"name": "web sockets", "size": 100, "chY": [1, 1, 4, 5, 4]}
       ]
     }
      ]},
          //800
      {"name": "concepts & practices",
      "children": [
        {"name": "OOP", "size": 100, "chY": [2, 3, 4, 3, 4]},
        {"name": "Agile", "size": 100, "chY": [2, 2, 4, 5, 5]},
        {"name": "TDD", "size": 100, "chY": [2, 2, 4, 3, 4]},
        {"name": "functional programming", "size": 100, "chY": [2, 2, 4, 3, 4]},
        {"name": "formal logic", "size": 100, "chY": [4, 5, 4, 3, 4]},
        {"name": "algorithm complexity", "size": 100, "chY": [2, 2, 4, 3, 4]},
       {"name": "AMD", "size": 100, "chY": [2, 2, 4, 3, 4]},
       {"name": "Version Control", 
        "children": [
        {"name": "Git", "size": 50, "chY": [1, 1, 4, 3, 4]},
        {"name": "SVN", "size": 50, "chY": [1, 1, 1, 4, 3]}

        ]
     }

      ]
    },
    //800
      {"name": "languages",
      "children": [
              {"name": "javascript", "size": 350, "chY": [1, 1, 2, 4, 5]},
              {"name": "python", "size": 150, "chY": [3, 4, 3, 4, 2]},
              {"name": "ruby", "size": 100, "chY": [1, 1, 4, 3, 3]},
              {"name": "java", "size": 200, "chY": [2, 3, 4, 3, 2]},
              {"name": "haskell", "size": 100, "chY": [1, 1, 4, 3, 3]}
      ]
    }
 
  ]}

function zoomBurst(){

var b = {
  w: 100, h: 40, s: 3, t: 10
};


var width = 330,
    height = 330,
    radius = (Math.min(width, height) / 2);

var formatNumber = d3.format(",d");

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var vis = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "container")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    var root = json;

createVisualization(json);

function createVisualization(json) {

  initializeBreadcrumbTrail();

  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });


    var path = vis.selectAll("path")
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .attr("class", "arcs")
      .attr("id", function(d,i){
        curr_id = "arc" + i;
        return "arc" + i;
      })
        .attr("height", function(d,i){
        return "100%";
      })
          .attr("width", function(d,i){
        return "100%";
      })
      .attr("viewbox", "0 0 300 300")
      .style("fill", function(d) { 
        if(d.name == "skills"){
          return "transparent";
        }else {
                  return color((d.children ? d : d.parent).name); 

        }
      }

        )
      .on("click", click)
       .on("mouseover", mouseover)


d3.select("#container").on("mouseleave", mouseleave); // added

  totalSize = path.node().__data__.value;
 };

 function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
    .style("visibility", "hidden");


  d3.selectAll(".arcs")

    .style("opacity", 1)

    $("#lineChart").hide();
   
}

function mouseover(d) {


  if(d.chY){
    if($("#lineChart").has("svg")){
      $("#lineChart svg").remove();
    }

  makeLineChart(d.chY);
          $("#lineChart").show();

}

  console.log(d)
  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll(".arcs")
    .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  console.log(sequenceArray)
  vis.selectAll("path")
    .filter(function(node) {
      return (sequenceArray.indexOf(node) >= 0);
    })
    .style("opacity", 1);
}




function flatten(root) {
  var nodes = [],
    i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

// Restore everything to full opacity when moving off the visualization.
function mouseout(d) {


  // Hide the breadcrumb trail
  // d3.select("#trail")
  //     .style("visibility", "hidden");

  // Deactivate all segments during transition.
  // d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.select(".arcs")
      .transition()
      .duration(800)
      .style("opacity", 1);
     

}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", 500)
      .attr("height", function() {
        return "100%";
      })
      .attr("id", "trail")
      .attr("viewbox", "0 0 " + 250 + " 50")
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push((b.w) + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray) {

console.log("Node array");
console.log(nodeArray);
  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return color(d.name); });

    

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", function(d){
        var name = d.name;
        var nameArr= name.split(" ");
        if(name != "responsive frameworks" && name != "concepts & practices" && name != "algorithm complexity" && name != "functional programming"){
          return b.h/2
            } 
            else{
              return b.h/3
            }
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { 
        var name = d.name;
        console.log(name);
        var nameArr= name.split(" ");
        console.log(nameArr);
        if(name != "responsive frameworks" && name != "concepts & practices" && name != "algorithm complexity" && name != "functional programming"){
        return d.name;
      } 
       else if(name == "algorithm complexity"){
        return "algorithm";
        }
       else if(name == "functional programming"){
        return "functional";
        }
      else if(name == "concepts & practices"){
        return "concepts &";
      }
      else{
        return nameArr[0];
      }
         }) 
      .attr("class", "bcText");





       entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", function(d){
        var name = d.name;
        var nameArr= name.split(" ");
        if(name != "responsive frameworks" && name != "concepts & practices" && name != "algorithm complexity" && name != "functional programming"){
          return;
            } 
    
            else{
              return b.h/1.5;
            }
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { 
        var name = d.name;
        console.log(name);
        var nameArr= name.split(" ");
        console.log(nameArr);
        if(name != "responsive frameworks" && name != "concepts & practices" && name != "algorithm complexity" && name != "functional programming"){
        return;
      } 
      else if(name == "algorithm complexity"){
        return "complexity";
        }
       else if(name == "functional programming"){
        return "programming";
        }
          else if(name == "concepts & practices"){
        return "practices";
        }
      else{
        return nameArr[1];
      }
         }) 
      .attr("class", "bcText");

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}function makeLineChart(yValues){

var svg_width = 200,
    svg_height = 180,
    data = yValues,
    years = [2013, 2014, 2015, 2016]
    margin = {top:10, right: 15, bottom:30, left: 30},
    chart_width = svg_width - margin.left - margin.right,
    chart_height = svg_height - margin.top - margin.bottom

// var transfer_x = d3.scale.linear().domain([2012, 2013, 2014, 2015, 2016]),
//     transfer_y = d3.scale.linear().domain([1, 5


// var transfer_x = d3.linear.scale()
//                       .domain([1, data.length])
//                       .range([0, chart_width]);

var x = d3.scale.ordinal()
    .domain(["2013", "2014", "2015", "2016"])
    .rangePoints([0, chart_width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");



  var transfer_x = d3.scale.linear().domain([0, years.length]).range([0, chart_width]),
    transfer_y = d3.scale.linear().domain([1, d3.max(data)]).range([chart_height, 0]);

var vis = d3.select("#lineChart")
.append("svg:svg")
.attr("width", svg_width)
.attr("height", svg_height)

var draw_line = d3.svg.line()
.x(function(d,i) { return transfer_x(i); })
.y(function(d) { return transfer_y(d); })
.interpolate("cardinal")

var g = vis.append("svg:g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

g.append("svg:path")
.attr("class", "area")
.attr("d", draw_line(data));

// var x_axis = d3.svg.axis().scale(transfer_x).orient("top").ticks().tickValues(["2012", "2013", "2014", "2015", "2016"]);
var y_axis = d3.svg.axis().scale(transfer_y).orient("left").ticks(4);

g.append("svg:g")
.call(xAxis)
.attr("class", "xaxis")
.attr("transform", "translate(0," + chart_height + ")")
.selectAll("text")
.attr("class", "axisText")

g.append("svg:g")
.attr("class", "yaxis")
.call(y_axis)
.selectAll("text")
.attr("class", "axisText")


}



// svg.append("path")
//   .attr("id", "wavy") //very important to give the path element a unique ID to reference later
//   .attr("d", "M 0,0 Q 0,0 0,20 Q 340,140 400,30") //Notation for an SVG path, from bl.ocks.org/mbostock/2565344
//   .style("fill", "none")
//   .style("stroke", "#AAAAAA");

// //Create an SVG text element and append a textPath element
// svg.append("text")
//    .append("textPath") //append a textPath to the text element
//   .attr("xlink:href", "#wavy") //place the ID of the path here
//   .style("text-anchor","middle") //place the text halfway on the arc
//   // .attr("startOffset", "50%")   
//   .text("web dev");

function click(d) {
  vis.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");

}
