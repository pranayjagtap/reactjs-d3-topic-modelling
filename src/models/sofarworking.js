// Global variables go here.
var matrix; //main svg
var matrix_data; //holds data to render matrix read from csv

var x,xAxis;
var y,yAxis;

var dimensions = {
    w_width: 1500,
    w_height: 1500,
    margin: {
        top: 80,
        right: 80,
        bottom: 80,
        left: 180
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
        var grpNames = d3.keys(data[0]).filter(function(key) { return key !== "Document"; });
        data.grpNames = grpNames
        data.forEach(function(d) {
            d.groups = grpNames.map(function(name) { return {name: name, value: +d[name]}; });
        });
        matrix_data = data;
        console.log(matrix_data)
        //init();
        test_matrix();
    })
};

var init = function(){
    x = d3.scale.ordinal()
        .rangeRoundBands([0, dimensions.width()]);

    y = d3.scale.ordinal()
        .rangeRoundBands([dimensions.height(), 0]);

    xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    matrix = d3.select("#matrix_canvas")
        .attr("width", dimensions.w_width)
        .attr("height", dimensions.w_height)
        .append("g")
        .attr("transform","translate("+dimensions.margin.left+","+dimensions.margin.top+")");

    refresh();
}

var refresh = function(){

    y.domain(matrix_data.map(function(d) { return d.Document; }));
    x.domain(matrix_data.grpNames);

    //var allcols = Object.keys(matrix_data[0]), cols = allcols.slice(1,allcols.length);

    // add x axis and tilt it by 45 degree and move it on top of the line
    matrix.append("g")
        .attr("class","x axis")
        .attr("transform","translate(0,0)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor","start")
        .attr("transform","rotate(-45)")
        .attr("dx","-15px")
        .attr("dy",x.rangeBand()/2 - 10)
        .attr("lable_col", function(d, i){return "col_"+i});;

    // add y axis and move it on top of the line
    matrix.append("g")
        .attr("class","y axis")
        .attr("transform","translate(0,0)")
        .call(yAxis)
        .selectAll("text")
        .attr("dx","0px")
        .attr("dy",y.rangeBand()/2 + 10)
        .attr("lable_row", function(d, i){return "row_"+i});

    // add id to row, makes it easy to select it
    var grows = matrix.selectAll(".grow")
        .data(matrix_data)
        .enter().append("g")
        .attr("class","grow")
        .attr("transform", function(d) { return "translate(0," + y(d.Document) + ")"; })
        .attr("row_id", function(d, i) { return "row_"+i})
    ;

    var gcells = grows.selectAll(".gcell")
        .data(function(d) { return d.groups; })
        .enter() 
        .append("g")
        .attr("transform", function(d,i,j) {
            return "translate(" + i*x.rangeBand() + ",0)" ; } )
        .attr("class","gcell")
        .attr("col_id", function(d, i){return "col_"+i})
    ;

    // add id to col, makes it easy to select it
    // remove color of grid
    gcells
        .append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height",y.rangeBand())
        .attr("width",x.rangeBand())
        .style("stroke-opacity",0)
        .style("stroke", "#ddd")
    ;

    var rmax = Math.min(y.rangeBand()/2-4,x.rangeBand()/2-4)
    //6.5
    gcells.append("circle")
        .on('drag',()=>{})
        .on('mouseover', circle_mouseover)
        .on('mouseout', circle_mouseout)
        .on('click',(d)=>{})
        .attr("cy",y.rangeBand())
        .attr("cx",x.rangeBand())
        .attr("r", function(d) { return Math.abs((d.value));})  //Made radius value rind on 26-Oct-2018-Pranay
        .style("fill", function(d) {return 'rgb(255,128,128)';})
        .style("stroke","black")
    ;

}

var circle_mouseover = function(doc) {
    let colid = d3.select(this.parentNode).attr("col_id")
    let rowid = d3.select(this.parentNode.parentNode).attr("row_id")
    d3.select(this).transition()
        .duration(100)
        .style('stroke-width', 3)
    d3.select("[row_id="+rowid+"]").selectAll("circle")
        .style("fill", "rgb(255,64,64)")
        .style("stroke-width", 3)
    d3.selectAll("[col_id="+colid+"]").select("circle")
        .style("fill", "rgb(255,64,64)")
        .style("stroke-width", 3)
    d3.select('[lable_row='+rowid+']')
        .style("font-weight", 700)
        .style("font-size", "12px")
    d3.select('[lable_col='+colid+']')
        .style("font-weight", 700)
        .style("font-size", "12px")
}

var circle_mouseout = function(d) {
    let colid = d3.select(this.parentNode).attr("col_id")
    let rowid = d3.select(this.parentNode.parentNode).attr("row_id")
    d3.select(this).transition()
    .duration(100)
    .style('stroke-width', 1);
    d3.select("[row_id="+rowid+"]").selectAll("circle")
        .style("fill", "rgb(255,128,128)")
        .style("stroke-width", 1)
    d3.selectAll("[col_id="+colid+"]").select("circle")
        .style("fill", "rgb(255,128,128)")
        .style("stroke-width", 1)
    d3.select('[lable_row='+rowid+']')
        .style("font-weight", 400)
        .style("font-size", "10px")
    d3.select('[lable_col='+colid+']')
        .style("font-weight", 400)
        .style("font-size", "10px")
}

export function test_matrix(){
    var n;

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 1200 - margin.left - margin.right,
        height = 1200 - margin.top - margin.bottom;


    var y = d3.scale.ordinal().rangeBands([0, height],0,1),
        x = d3.scale.ordinal().rangeBands([0, width],0,1),
        c = d3.scale.category20().domain(d3.range(50));


    var dragging = {};


    var svg = d3.select("#matrix_canvas")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", margin.left + "px")
        .append("g")
        .attr("id", "matrix")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = [[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2,3,4,5]];

    var matrixA = [],
        matrixB = [];
    var newnodes = [];
    var nodes = matrix_data.grpNames;

    nodes.forEach(function(node, i){
        newnodes.push({"name": node});
    });

        nodes = newnodes;
        n = nodes.length;

    nodes.forEach(function(node, i) {
        node.index = i;
        node.count = 0;
        matrixA[i] = d3.range(n).map((j) => { 
            return {x: j, y: i, z: data[j%6][i%6]}; });
        matrixB[i] = d3.range(n).map((j) => { 
            return {x: i, y: j, z: data[i%6][j%6]}; });
    });
    
    // Default order
    var orders = {
        name: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].name, nodes[b].name); })
    };

    // The default sort order.
    y.domain(orders.name);
    x.domain(orders.name);


    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "white");


    var row = svg.selectAll(".row")
        .data(matrixA)
        .enter().append("g")
        .attr("class", "row")
        .attr("row_id", function(d, i){return "row_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(0," + y(i) + ")"; })
        .each(row);


    var column = svg.selectAll(".column")
        .data(matrixB)
        .enter().append("g")
        .attr("class", "column")
        .attr("col_id", function(d, i){return "col_"+i;})
        .attr("transform", function(d, i) { 
            return "translate(" + x(i) + ")rotate(-90)"; })
        .each(column);

    var drag_behavior = d3.behavior.drag();
    var trigger;


    d3.selectAll(".row").call(d3.behavior.drag()
        .origin(function(d) { 
            return {y: y(d[0].y)}; 
        })
        .on("dragstart", function(d) {

            trigger = d3.event.sourceEvent.target.className.baseVal;
            
            if (trigger == "label") {
                d3.selectAll(".cellrow").attr("opacity", 1);
                dragging[d[0].y] = y(d[0].y);

                // Move the row that is moving on the front
                var sel = d3.select(this);
                sel.moveToFront();
            }
        })
        .on("drag", function(d) {
            // Hide what is in the back

            if (trigger == "label") {

                d3.selectAll(".cellcolumn").attr("opacity", 0);

                dragging[d[0].y] = Math.min(height, Math.max(0, d3.event.y));
                orders.name.sort(function(a, b) { return position(a) - position(b); });
                y.domain(orders.name);

                d3.selectAll(".row").attr("transform", function(d, i) { 
                    if(d){
                        return "translate(0," + position(d[0].y) + ")"; 
                    }
                });
            }
        })
        .on("dragend", function(d) {

            if (trigger == "label") {
                delete dragging[d[0].y];
                transition(d3.select(this)).attr("transform", "translate(0," + y(d[0].y) + ")");

                d3.selectAll(".column").each(function(d) {
                    d3.select(this).selectAll(".cellcolumn").attr("x", function(d) { 
                        return -y(d.y); });
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
        .text(function(d, i) { return nodes[i].name; });


    d3.selectAll(".column").call(drag_behavior
        .origin(function(d) {
            return {x: x(d[0].x)}; 
        })
        .on("dragstart", function(d) {

            trigger = d3.event.sourceEvent.target.className.baseVal;

            if (trigger == "label") {

                d3.selectAll(".cellcolumn").attr("opacity", 1);

                dragging[d[0].x] = x(d[0].x);

                // Move the column that is moving on the front
                var sel = d3.select(this);
                sel.moveToFront();
            }
        })
        .on("drag", function(d) {
            // Hide what is in the back
            // console.log(d3.event.x);
            // console.log(d3.event.y);
            if (trigger == "label") {
                d3.selectAll(".cellrow").attr("opacity", 0);

                dragging[d[0].x] = Math.min(width, Math.max(0, d3.event.x));
                orders.name.sort(function(a, b) { return cPosition(a) - cPosition(b); });
                x.domain(orders.name);

                d3.selectAll(".column").attr("transform", function(d, i) { 
                    return "translate(" + cPosition(d[0].x) + ")rotate(-90)"; 
                });
            }
      

        })
        .on("dragend", function(d) {
            delete dragging[d[0].x];
            transition(d3.select(this)).attr("transform", "translate(" + x(d[0].x) + ")rotate(-90)");
            d3.selectAll(".row").each(function(d, i) {
            d3.select(this).selectAll(".cellrow").attr("x", function(d) { 
                return x(d.x); });
            });

        })
    );

    column.append("text")
        .attr("class", "label")
        .attr("x", -10)
        .attr("y", 0)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return nodes[i].name; });

    function row(row) {
        var cell = d3.select(this).selectAll(".cellrow")
            .data(row.filter(function(d) { 
                return d.z; 
            }))
            .enter().append("circle")
            .attr("class", "cellrow")
            .attr("cx", function(d) { 
                return y(d.x); 
            })
            .attr("width", y.rangeBand())
            .attr("height", y.rangeBand())
            .attr("fill", "#f99")
            // .style("stroke","black")
            // .style("stroke-width", 1)
            .style("r", function(d, i) { 
                console.log("in rows data",d);
                return d.z;
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
                return -x(d.y); 
            })
            .attr("width", x.rangeBand())
            .attr("height", x.rangeBand())
            .attr("fill", "#f99")
            // .style("stroke","black")
            // .style("stroke-width", 1)
            .style("r", function(d,i,j) { 
                return d.z;
            })
            .on("mouseover", function(d){
                var pos_id = d3.select(this).attr("pos_id");
                var row = "row_"+pos_id.split("_")[2];
                var col = "col_"+pos_id.split("_")[1];
                // d3.select("[row_id="+row+"]").selectAll("circle").style("fill", "#5f5").style("opacity",1);
                // d3.select("[col_id="+col+"]").selectAll("circle").style("fill", "#5f5").style("opacity",1);
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
export function render_matrix(){
    read_data();
}