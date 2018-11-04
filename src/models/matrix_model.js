// Global variables go here.
var matrix; //main svg
var matrix_data = {
    topicids: "",
    docids: "",
    weights:""
}; //holds data to render matrix read from csv

var x,y;

var dimensions = {
    grid_size: 30,
    w_width: 1200,
    w_height: 1200,
    margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 170
    },
    width: function(){
        return this.w_width - (this.margin.left + this.margin.right)
    },

    height: function(){
        return this.w_height - (this.margin.top + this.margin.bottom)
    }
}

//remember the position of the elem being dragged
var dragging = {};

var top_matrix = [],doc_matrix = [];
var top_nodes = [];
var doc_nodes = [];
var t_cnt = 0;
var d_cnt = 0;
var t_nodes=[], d_nodes=[];

var top_orders = {};
var doc_orders = {};

var read_data = function(){
    d3.csv("../Data/theta.csv", function(error, data) {
        // console.log("in callback");
        var topicids = [];
        var docids = [];
        var weights = [];

        data.map(function(row){
            //read topic names
            if(topicids.length == 0){
                for(var k in row) topicids.push(k);
                topicids.shift();  //removes first element
                // console.log("i should only get called once");
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

        // console.log("final matrix", matrix_data);

        // Dummy data
        // matrix_data["docids"] = ["a", "b", "c", "d", "e", "f", "a", "b", "c", "d", "e", "f", "a", "b", "c", "d", "e", "f", "a", "b", "c", "d", "e", "f"];
        // matrix_data["topicids"] = ["1", "2", "3", "4", "5", "1", "2", "3", "4", "5"];
        // matrix_data["weights"] = [["1","2","3","4","5", "1","2","3","4","5"],["2","3","4","5","1", "2","3","4","5","1"],["3","4","5","1","2", "3","4","5","1","2"],["4","5","1","2","3", "4","5","1","2","3"],["5","4","3","2","1", "5","4","3","2","1"], ["1","3","2","5","4", "1","3","2","5","4"], ["1","2","3","4","5", "1","2","3","4","5"],["2","3","4","5","1", "2","3","4","5","1"],["3","4","5","1","2", "3","4","5","1","2"],["4","5","1","2","3", "4","5","1","2","3"],["5","4","3","2","1", "5","4","3","2","1"], ["1","3","2","5","4", "1","3","2","5","4"], ["1","2","3","4","5", "1","2","3","4","5"],["2","3","4","5","1", "2","3","4","5","1"],["3","4","5","1","2", "3","4","5","1","2"],["4","5","1","2","3", "4","5","1","2","3"],["5","4","3","2","1", "5","4","3","2","1"], ["1","3","2","5","4", "1","3","2","5","4"], ["1","2","3","4","5", "1","2","3","4","5"],["2","3","4","5","1", "2","3","4","5","1"],["3","4","5","1","2", "3","4","5","1","2"],["4","5","1","2","3", "4","5","1","2","3"],["5","4","3","2","1", "5","4","3","2","1"], ["1","3","2","5","4", "1","3","2","5","4"]];
        // console.log("dummy matrix", matrix_data);
        dimensions.w_width = (dimensions.grid_size-1) * matrix_data["weights"][0].length;
        dimensions.w_height = (dimensions.grid_size-2) * matrix_data["weights"].length;
        // console.log(dimensions);
        init();
        draw_matrix(matrix_data);
    })
};

function init(){
    y = d3.scale.ordinal().rangeBands([0, dimensions.w_height],0,1);
    x = d3.scale.ordinal().rangeBands([0, dimensions.w_width],0,1);
}

function draw_matrix(data){
    // clean the slate before drawing
    d3.select("#matrix").remove();
    matrix = d3.select("#matrix_canvas")
        .attr("width", dimensions.w_width+dimensions.margin.left+dimensions.margin.right)
        .attr("height", dimensions.w_height+dimensions.margin.top+dimensions.margin.bottom)
        .append("g")
        .attr("id", "matrix")
        .attr("transform", "translate(" + (dimensions.margin.left) + "," + dimensions.margin.top + ")");

    // Maintain two matrix for doc view and topic view drag
    top_matrix = [],doc_matrix = [];
    top_nodes = data.topicids;
    doc_nodes = data.docids;
    t_cnt = top_nodes.length;
    d_cnt = doc_nodes.length;
    t_nodes=[], d_nodes=[];


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
            return {x: j, y: i, z: scale_radius(data["weights"][j][i], 0, 20)}; 
        });
    }); //50x36 matrix

    d_nodes.forEach(function(node, i) {
        node.index = i;
        node.count = 0;
        doc_matrix[i] = d3.range(t_cnt).map((j) => { 
            return {x: i, y: j, z: scale_radius(data["weights"][i][j], 0, 20)}; 
        });
    }); //36x50 matrix

    // Default order
    top_orders = {
        id: d3.range(t_cnt),
        name: d3.range(t_cnt).sort(function(a, b) { return d3.ascending(t_nodes[a].name, t_nodes[b].name); }),
    };
    doc_orders = {
        id: d3.range(d_cnt),
        name: d3.range(d_cnt).sort(function(a, b) { return d3.ascending(d_nodes[a].name, d_nodes[b].name); }),
    };

    // console.log(doc_orders, top_orders)

    // The default sort order.
    y.domain(doc_orders.id);
    x.domain(top_orders.id);

    var row = matrix.selectAll(".row")
        .data(doc_matrix)
        .enter().append("g")
        .attr("class", "row")
        .attr("row_id", function(d, i){return "row_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(0," + y(i) + ")"; })
        .each(row_fn);

    var column = matrix.selectAll(".column")
        .data(top_matrix)
        .enter().append("g")
        .attr("class", "column")
        .attr("col_id", function(d, i){return "col_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(" + x(i) + ")rotate(-90)"; })
        .each(column_fn);

    var gbox = matrix.selectAll(".gbox")
        .data(Array(data["weights"][0].length).fill().map(() => Array(data["weights"].length).fill(0)))
        .enter().append("g")
        .attr("class", "gbox")
        .attr("col_id", function(d, i){return "grd_col_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(" + (x(i) - dimensions.grid_size/2) + ", "+ (-dimensions.grid_size/2)+")"; })
        .each(gbox_fn);

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
                dragging[d[0].x] = Math.min(dimensions.w_height, Math.max(0, d3.event.y));
                doc_orders.id.sort(function(a, b) { return position(a) - position(b); });
                y.domain(doc_orders.id);
                d3.selectAll(".row").attr("transform", function(d) { 
                    if(d)
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
                updateMatrixAndRedraw(data, doc_orders.id, 'left');
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
                dragging[d[0].y] = Math.min(dimensions.w_width, Math.max(0, d3.event.x));
                top_orders.id.sort(function(a, b) { return cPosition(a) - cPosition(b); });
                x.domain(top_orders.id);
                d3.selectAll(".column").attr("transform", function(d) { 
                    if(d)
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
            updateMatrixAndRedraw(data, top_orders.id, 'top');
        })
    );

    column.append("text")
        .attr("class", "label")
        .attr("x", -10)
        .attr("y", 0)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return t_nodes[i].name; });
}

function row_fn(row) {
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
        });
}

function column_fn(column) {
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
        });
}

function gbox_fn(gbox, j) {
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
        .style("height", dimensions.grid_size*0.9)
        .style("width", dimensions.grid_size*0.93)
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


function updateMatrixAndRedraw(data, orders, dimension){
    // console.log("dimension is: ", dimension);
    var tempweights = data["weights"];
    var temptopicids = data["topicids"];
    var tempdocids = data["docids"];
    // console.log("data before:", data);
    // console.log("temp before:", temp);
    if(dimension == 'top'){
        // console.log("top orders", top_orders);
        for(var i=0; i<tempweights.length; i++){
            tempweights[i] = togetherSort(tempweights[i], orders);
        }
        // console.log("n top_orders", top_orders);
        // console.log("b4 topids", temptopicids);
        temptopicids = togetherSort(temptopicids, orders);
        // console.log("after topids", temptopicids);
    }
    if(dimension == 'left'){
        // console.log("doc orders", doc_orders);
        tempweights = togetherSort(tempweights, orders);
        tempdocids = togetherSort(tempdocids, orders);
    }
    // console.log("data after:", data);
    // console.log("temp after:", temp);
    var temp = {
        topicids: temptopicids,
        docids: tempdocids,
        weights: tempweights
    }

    // Timeout just to let the animation settle
    setTimeout(function(){
        draw_matrix(temp);
        // uncomment to test out animation
        // sort_animate(doc_orders.name, "document");
        // sort_animate(top_orders.name, "topic");
    }, 500);
    
}

function togetherSort(array, orders){
    if(array.length != orders.length){
        console.log("array and orders dims dont match!", array.length, orders.length);
        return;
    }
    //1) combine the arrays:
    // var list = [];
    // for (var j = 0; j < array.length; j++) 
    //     list.push({'item': array[j], 'id': orders[j]});

    // console.log("mash b4 sort:", list);
    // //2) sort:
    // list.sort(function(a, b) {
    //     return a.id - b.id;
    // });
    // console.log("mash after sort:", list);
    // //3) separate them back out:
    // for (var k = 0; k < list.length; k++) {
    //     array[k] = list[k].item;
    // }
    var n_array = [];
    for(var i=0; i<orders.length; i++){
        n_array.push(array[orders[i]]);
    }
    return n_array;
}

function sort_animate(orders, dimension){
    if(dimension == "topic"){
        for(var i=0;i<orders.length;i++){
            d3.select("[col_id=col_" + i +"]")
                .transition().duration(1000)
                .attr("transform", function(d) {return "translate(" + (x(orders.indexOf(i))) + ", 0)rotate(-90)"})
        }
    }
    if(dimension == "document"){
        for(var i=0;i<orders.length;i++){
            d3.select("[row_id=row_" + i +"]")
                .transition().duration(1000)
                .attr("transform", function(d) {return "translate(0, " + (y(orders.indexOf(i))) + ")"})
        }
    }

}
function scale_radius(r, min, max){
    return (r-min)/(max-min) * 10;
}
export function render_matrix(){
    read_data();
}