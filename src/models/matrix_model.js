// Global variables go here.
var matrix; //main svg
var matrix_data = {
    topicids: "",
    docids: "",
    weights:""
}; //holds data to render matrix read from csv

var x,xAxis;
var y,yAxis;

var dimensions = {
    w_width: 1200,
    w_height: 1200,
    margin: {
        top: 50,
        right: 250,
        bottom: 50,
        left: 50
    },
    width: function(){
        return this.w_width - (this.margin.left + this.margin.right)
    },

    height: function(){
        return this.w_height - (this.margin.top + this.margin.bottom)
    }
}

var read_data = function(){
    d3.csv("../Data/theta.csv", function(error, data) {
        console.log("in callback");
        var topicids = [];
        var docids = [];
        var weights = [];

        data.map(function(row){
            //read topic names
            if(topicids.length == 0){
                for(var k in row) topicids.push(k);
                topicids.shift();  //removes first element
                console.log("i should only get called once");
            }

            //read document names
            docids.push(row.Document);

            //read data
            var row_data = [];
            for(var k in row) row_data.push(row[k]);
            row_data.shift();
            weights.push(row_data);
        });
        
        matrix_data["docids"] = docids;
        matrix_data["topicids"] = topicids;
        matrix_data["weights"] = weights;

        console.log("final matrix", matrix_data)
        test_matrix();
    })
};

function test_matrix(){
    d3.select("#matrix").remove();
    // var margin = {top: 50, right: 50, bottom: 50, left: 150},
    //     width = 1200 - margin.left - margin.right,
    //     height = 1200 - margin.top - margin.bottom;


    var y = d3.scale.ordinal().rangeBands([0, dimensions.height()],0,2),
        x = d3.scale.ordinal().rangeBands([0, dimensions.width()],0,2);

    var dragging = {};


    var svg = d3.select("#matrix_canvas")
        .attr("width", dimensions.w_width)
        .attr("height", dimensions.w_height)
        //.style("margin-left", dimensions.margin.left + "px")
        .append("g")
        .attr("id", "matrix")
        .attr("transform", "translate(" + (dimensions.margin.left+200) + "," + dimensions.margin.top + ")");

    // Maintain two matrix for doc view and topic view drag
    var top_matrix = [],doc_matrix = [];

    var top_nodes = matrix_data.topicids;
    var doc_nodes = matrix_data.docids;

    var t_cnt = top_nodes.length;
    var d_cnt = doc_nodes.length;

    var t_nodes=[], d_nodes=[];


    //Topic names
    for(var i=0; i<t_cnt; i++){
        t_nodes.push({"name": top_nodes[i]});
    }
    //Document names
    for(var i=0; i<d_cnt; i++){
        d_nodes.push({"name": doc_nodes[i]});
    }

    t_nodes.forEach(function(node, i) {
        node.index = i;
        node.count = 0;
        top_matrix[i] = d3.range(d_cnt).map((j) => { 
            return {x: j, y: i, z: scale_radius(matrix_data["weights"][j][i], 0, 10)}; });
    }); //50x36 matrix

    d_nodes.forEach(function(node, i) {
        node.index = i;
        node.count = 0;
        doc_matrix[i] = d3.range(t_cnt).map((j) => { 
            return {x: i, y: j, z: scale_radius(matrix_data["weights"][i][j], 0, 10)}; });
    }); //36x50 matrix

    // Default order
    var top_orders = {
        name: d3.range(t_cnt)
        //name: d3.range(t_cnt).sort(function(a, b) { return d3.ascending(t_nodes[a].name, t_nodes[b].name); })
    };
    var doc_orders = {
        name: d3.range(d_cnt)
        //name: d3.range(d_cnt).sort(function(a, b) { return d3.ascending(d_nodes[a].name, d_nodes[b].name); })
    };

    // console.log(doc_orders, top_orders)
    // The default sort order.
    y.domain(doc_orders.name);
    x.domain(top_orders.name);

    var row = svg.selectAll(".row")
        .data(doc_matrix)
        .enter().append("g")
        .attr("class", "row")
        .attr("row_id", function(d, i){return "row_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(0," + y(i) + ")"; })
        .each(row);


    var column = svg.selectAll(".column")
        .data(top_matrix)
        .enter().append("g")
        .attr("class", "column")
        .attr("col_id", function(d, i){return "col_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(" + x(i) + ")rotate(-90)"; })
        .each(column);

    var gbox = svg.selectAll(".gbox")
        .data(Array(50).fill().map(() => Array(36).fill(0)))
        .enter().append("g")
        .attr("class", "gbox")
        .attr("col_id", function(d, i){return "grd_col_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(" + (x(i)-10) + ", "+ (-15)+")"; })
        .each(gbox);

    var trigger;


    d3.selectAll(".row").call(d3.behavior.drag()
        .origin(function(d) { 
            return {y: y(d[0].x)}; 
        })
        .on("dragstart", function(d) {
            trigger = d3.event.sourceEvent.target.className.baseVal;
            if (trigger == "label") {
                d3.selectAll(".cellrow").attr("opacity", 1);
                dragging[d[0].x] = y(d[0].x);
                var sel = d3.select(this);
                sel.moveToFront();
            }
        })
        .on("drag", function(d) {
            if (trigger == "label") {
                d3.selectAll(".cellcolumn").attr("opacity", 0);
                dragging[d[0].x] = Math.min(dimensions.height(), Math.max(0, d3.event.y));
                doc_orders.name.sort(function(a, b) { return position(a) - position(b); });
                y.domain(doc_orders.name);
                d3.selectAll(".row").attr("transform", function(d) { 
                    return "translate(0," + position(d[0].x) + ")";
                });
            }
        })
        .on("dragend", function(d) {
            if (trigger == "label") {
                delete dragging[d[0].x];
                transition(d3.select(this)).attr("transform", "translate(0," + y(d[0].x) + ")");
                d3.selectAll(".column").each(function(d) {
                    d3.select(this).selectAll(".cellcolumn").attr("x", function(d) { 
                        return -y(d.x); });
                });
            }
        })
    );

    row.append("text")
        .attr("class", "label")
        .attr("x", 10)
        .attr("y", 0)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return d_nodes[i].name; });


    d3.selectAll(".column").call(d3.behavior.drag()
        .origin(function(d) {
            return {x: x(d[0].y)}; 
        })
        .on("dragstart", function(d) {
            trigger = d3.event.sourceEvent.target.className.baseVal;
            if (trigger == "label") {
                d3.selectAll(".cellcolumn").attr("opacity", 1);
                dragging[d[0].y] = x(d[0].y);
                var sel = d3.select(this);
                sel.moveToFront();
            }
        })
        .on("drag", function(d, i) {
            if (trigger == "label") {
                d3.selectAll(".cellrow").attr("opacity", 0);
                dragging[d[0].y] = Math.min(dimensions.width(), Math.max(0, d3.event.x));
                top_orders.name.sort(function(a, b) { return cPosition(a) - cPosition(b); });
                x.domain(top_orders.name);
                d3.selectAll(".column").attr("transform", function(d) { 
                    return "translate(" + cPosition(d[0].y) + ")rotate(-90)"; 
                });
            }

        })
        .on("dragend", function(d, i) {
            delete dragging[d[0].y];
            transition(d3.select(this)).attr("transform", "translate(" + x(d[0].y) + ")rotate(-90)");
            d3.selectAll(".row").each(function(d, i) {
                d3.select(this).selectAll(".cellrow").attr("x", function(d) { 
                    return x(d.y);
                });
            });

        })
    );

    column.append("text")
        .attr("class", "label")
        .attr("x", -10)
        .attr("y", 0)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return t_nodes[i].name; });

    function row(row) {
        var cell = d3.select(this).selectAll(".cellrow")
            .data(row.filter(function(d) { 
                return d.z; 
            }))
            .enter().append("circle")
            .attr("pos_id", function(d){return "pos_"+d.x+"_"+d.y;})
            .attr("class", "cellrow")
            .attr("cx", function(d) { 
                if(x(d.y))
                    return x(d.y); 
            })
            .attr("fill", "#000")
            .style("r", function(d, i) { 
                return d.z;
            }).on("mouseover", function(d){
                var pos_id = d3.select(this).attr("pos_id");
                var row = "row_"+pos_id.split("_")[1];
                var col = "col_"+pos_id.split("_")[2];
                d3.select("[row_id="+row+"]").selectAll("circle").style("fill", "#fa0");
                d3.select("[col_id="+col+"]").selectAll("circle").style("fill", "#fa0");
            }).on("mouseout", function(d){
                var pos_id = d3.select(this).attr("pos_id");
                var row = "row_"+pos_id.split("_")[1];
                var col = "col_"+pos_id.split("_")[2];
                d3.select("[row_id="+row+"]").selectAll("circle").style("fill", "#000");
                d3.select("[col_id="+col+"]").selectAll("circle").style("fill", "#000");
            });
    }

    function column(column) {
        var cell = d3.select(this).selectAll(".cellcolumn")
            .data(column.filter(function(d) { 
                return d.z; 
            }))
            .enter().append("circle")
            .attr("pos_id", function(d){return "pos_"+d.x+"_"+d.y;})
            .attr("class", "cellcolumn")
            .attr("cx", function(d) { 
                return -y(d.x); 
            })
            .attr("fill", "#000")
            .style("r", function(d,i,j) { 
                return d.z;
            })
            .on("mouseover", function(d){
                
            }).on("mouseout", function(d){
                
            });

    }

    function gbox(gbox, j) {
        var g = d3.select(this).selectAll(".gboxbox")
            .data(gbox)
            .enter().append("rect")
            .attr("class", "gboxbox")
            .attr("y", function(d, i){
                return y(i);
            })
            .attr("row_id", function(d, i){
                return "grd_row_"+i;
            })
            .attr("col_id", function(d, i){
                return "grd_col_"+j;
            })
            .style("fill", "#aaa0")
            .style("height", 28)
            .style("width", 17)
            .on("mouseout", function(d){
                var rid = d3.select(this).attr("row_id").split("grd_row_")[1];
                var cid = d3.select(this.parentNode).attr("col_id").split("grd_col_")[1]
                d3.selectAll("[row_id=grd_row_"+rid+"]").style("fill", "#aaa0");
                d3.selectAll("[col_id=grd_col_"+cid+"]").style("fill", "#aaa0");
            })
            .on("mouseover", function(d){
                var rid = d3.select(this).attr("row_id").split("grd_row_")[1];
                var cid = d3.select(this.parentNode).attr("col_id").split("grd_col_")[1]
                d3.selectAll("[row_id=grd_row_"+rid+"]").style("fill", "#aaa5");
                d3.selectAll("[col_id=grd_col_"+cid+"]").style("fill", "#aaa5");
            });
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };

    function position(d) {
        var v = dragging[d];
        return v == null ? y(d) : v;
    }

    function cPosition(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }

    function transition(g) {
        return g.transition().duration(500);
    }
}

function scale_radius(r, min, max){
    return (r-min)/(max-min) * 4;
}
export function render_matrix(){
    read_data();
}