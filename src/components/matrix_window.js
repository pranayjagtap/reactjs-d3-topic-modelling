/*
* Matrix view contains bubble chart/matrix graph for topic vs document counts.
* Change#1:
* Date: 17-Oct-2018
* Author: Pranay Jagtap
* Searchstring:"mwchng1"
* Finished rendering matrix. It is static and need to add interaction.
*
*
* */



import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import '../../style/serendip.css';
import * as matrix_model from '../models/matrix_model.js'

class Matrix extends Component{
    constructor(props){
        super(props);
        console.log("in matrix_window:", props);
        this.state = {
            handleTopicChange: props.handleTopicChange,
            handleDocumentChange:props.handleDocumentChange
        }
    }

    componentDidMount(){
        //Call plotMatrix on page refresh/load to generate matrix plot based on existing data file.
        //this.plotMatrix();
        var model = matrix_model.render_matrix(this.state);
        // console.log("model is:", model);
        // setTimeout(()=>{model.sort_matrix("min");}, 5000)

    }

//mwchng1 starts
    //plotMatrix function will contain d3 code for encoding data into matrix visualization. Started 17-Oct-2018
    plotMatrix(){

        var totWidth = 1400,
            totHeight = totWidth,
            margin = {top: 80, right: 80, bottom: 80, left: 80},
            width = totWidth - (margin.left + margin.right),
            height = totHeight - (margin.top + margin.bottom);

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")

        var chart = d3.select("#matrix_canvas")
            .attr("width", totWidth)
            .attr("height", totHeight)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");


        d3.csv("../Data/theta.csv"/*, type*/, function(error, data) {
            var grpNames = d3.keys(data[0]).filter(function(key) { return key !== "Document"; });

            data.forEach(function(d) {
                d.groups = grpNames.map(function(name) { return {name: name, value: +d[name]}; });
            });

            y.domain(data.map(function(d) { return d.Document; }));
            var allcols = Object.keys(data[0]),
                cols = allcols.slice(1,allcols.length);
            x.domain(grpNames);

            // vj - add x axis and tilt it by 45 degree and move it on top of the line
            chart.append("g")
                .attr("class","x axis")
                .attr("transform","translate(0,0)")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor","start")
                .attr("transform","rotate(-45)")
                .attr("dx","-15px")
                .attr("dy",x.rangeBand()/2 - 10)
            ;

            // vj - add y axis and move it on top of the line
            chart.append("g")
                .attr("class","y axis")
                .attr("transform","translate(0,0)")
                .call(yAxis)
                .selectAll("text")
                .attr("dx","0px")
                .attr("dy",x.rangeBand()/2 + 10)
            ;

            // vj - add id to row, makes it easy to select it
            var grows = chart.selectAll(".grow")
                .data(data)
                .enter().append("g")
                .attr("class","grow")
                .attr("transform", function(d) { return "translate(0," + y(d.Document) + ")"; })
                .attr("row_id", function(d, i) {return "row_"+i})
            ;

            var gcells = grows.selectAll(".gcell")
                .data(function(d) { return d.groups; })
                .enter()
                .append("g")
                .attr("transform", function(d,i,j) {
                    return "translate(" + i*x.rangeBand() + ",0)" ; } )
                .attr("class","gcell")
            ;

            // vj - add id to col, makes it easy to select it
            // vj - remove color of grid
            gcells
                .append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("col_id", function(d, i){return "col_"+i})
                .attr("height",y.rangeBand())
                .attr("width",x.rangeBand())
                .style("stroke-opacity",0)
                .style("stroke", "#fff")
            ;

            var rmax = Math.min(y.rangeBand()/2-4,x.rangeBand()/2-4)
            //6.5
            gcells.append("circle")
                .on('drag',()=>{


            })
                .on('mouseover', function(doc) {
                    let colid = d3.select(this.parentNode).select("rect").attr("col_id")
                    let rowid = d3.select(this.parentNode.parentNode).attr("row_id")
                    d3.select(this).transition()
                    .duration(100)
                    .style('stroke-width', 3)


                })
                .on('mouseout', function(d) {
                    d3.select(this).transition()
                    .duration(100)
                    .style('stroke-width', 1);

                })
                .on('click',(d)=>{

                })
                .attr("cy",y.rangeBand())
                .attr("cx",x.rangeBand())
                .attr("r", function(d) {
                        var rind = d.value;
                        return Math.abs((rind));  //Made radius value rind on 26-Oct-2018-Pranay
                    }
                )
                .style("fill", function(d) {
                        var gbval = 1+Math.floor(255 - (255/4*(d.value-1)));
                        return "rgb(" + 255 + "," + gbval + "," + gbval + ")";
                    }
                )
                .style("stroke","black")
            ;

            //Commented by Pranay below code to avoid legend on 26-Oct-2018
/*
            var legend = chart
                .append("g")
                .attr("transform", "translate(0," + (height + 0) + ")")
                .attr("class","legend")
                .style("font-weight","bold")
            ;
            var legwidths = [0,1,5,10];
            var legsymbols = legend.selectAll(".legsymbols")
                .data(["0.00-0.01","0.01-0.05","0.05-0.10",">0.10"])
                .enter()
                .append("g")
                .attr("class","legsymbols")
                .attr("transform",function(d,i) {return "translate(" + (150 + legwidths[i]) + ",0)";})
            ;

            var legendspace = 50;

            legsymbols.append("circle")
                .attr("cx", function(d,i) {return (i+1) ;})
                .attr("cy", function(d,i) {return (legendspace+2*rmax) - (((i+1))) ;})
                .style("fill", function(d,i) {
                        var gbval = 1+Math.floor(255 - (255/4*((i+1)-1)));
                        return "rgb(" + 255 + "," + gbval + "," + gbval + ")";
                    }
                )
                .style("stroke","black")
                .attr("r", function(d,i) {
                        return Math.abs(((i+1)));
                    }
                )
            ;


            legsymbols.append("text")
                .attr("x", function(d,i) {return 10+2*((i+1));})
                .attr("y", legendspace + 2*rmax)
                .style("text-anchor", "start")
                .text(function(d) { return d; });

            legend
                .append("text")
                .text("Similarity:")
                .attr("y", rmax*2+ legendspace)
            ;
*/
        });

    }
    //Render will return svg elemen(id="matrix_canvas") where vsiualization will be rendered. Added on 17-Oct-2018.
    render (){
        return (
            <div className="window side">
                <div className="window side">
                    <div className="sidenavbar">Matrix View</div>
                </div>
                <div className="matrixcanvas" style={{height: '550px'}}>
                    <svg id="matrix_canvas" width="100%" height="100%"/>
                </div>
            </div>

        );
    }



//mwchng1 ends
}
export default Matrix;