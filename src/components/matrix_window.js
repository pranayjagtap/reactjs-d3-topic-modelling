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

class Matrix extends Component{
    constructor(props){
        super(props);

        this.state={term:''};

    }

    componentDidMount(){
     //Call plotMatrix on page refresh/load to generate matrix plot based on existing data file.
        this.plotMatrix();
    }
//mwchng1 starts
    //plotMatrix function will contain d3 code for encoding data into matrix visualization. Started 17-Oct-2018
    plotMatrix(){

        var totWidth = 500,
            totHeight = totWidth * 1.2,
            margin = {top: 80, right: 30, bottom: 80, left: 80},
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


        d3.tsv("../Data/igmat.tsv"/*, type*/, function(error, data) {

            var grpNames = d3.keys(data[0]).filter(function(key) { return key !== "Industry"; });

            data.forEach(function(d) {
                d.groups = grpNames.map(function(name) { return {name: name, value: +d[name]}; });
            });

            y.domain(data.map(function(d) { return d.Industry; }));
            var allcols = Object.keys(data[0]),
                cols = allcols.slice(1,allcols.length);
            x.domain(grpNames);

            chart.append("g")
                .attr("class","x axis")
                .attr("transform","translate(0,0)")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor","start")
                .attr("transform","rotate(-90)")
                .attr("dx","0.5em")
                .attr("dy",x.rangeBand()/2-10)
            ;

            chart.append("g")
                .attr("class","y axis")
                .call(yAxis)
            ;

            var grows = chart.selectAll(".grow")
                .data(data)
                .enter().append("g")
                .attr("class","grow")
                .attr("transform", function(d) { return "translate(0," + y(d.Industry) + ")"; })
            ;

            var gcells = grows.selectAll(".gcell")
                .data(function(d) { return d.groups; })
                .enter() .append("g")
                .attr("transform", function(d,i,j) {return "translate(" + i*x.rangeBand() + ",0)" ; } )
                .attr("class","gcell")
            ;

            gcells
                .append("rect")
                .attr("x",0)
                .attr("y",0)
                .attr("height",y.rangeBand())
                .attr("width",x.rangeBand())
                .style("fill-opacity",1)
                .style("fill", function(d,i,j) {
                        if ((i % 2 != 0 && j % 2 == 0))
                        {return "#dddddd";}
                        else if (i % 2 != 0 || j % 2 == 0)
                        {return "#eeeeee";}
                        else
                        {return "#ffffff";}
                    }
                )
            ;

            var rmax = Math.min(y.rangeBand()/2-4,x.rangeBand()/2-4)
            gcells.append("circle")
                .attr("cy",y.rangeBand()/2)
                .attr("cx",x.rangeBand()/2)
                .attr("r", function(d) {
                        var rind = d.value;
                        return rmax / ((-1)*(rind - 5));
                    }
                )
                .style("fill", function(d) {
                        var gbval = 1+Math.floor(255 - (255/4*(d.value-1)));
                        return "rgb(" + 255 + "," + gbval + "," + gbval + ")";
                    }
                )
                .style("stroke","black")
            ;

            var legend = chart
                .append("g")
                .attr("transform", "translate(0," + (height + 0) + ")")
                .attr("class","legend")
                .style("font-weight","bold")
            ;
            var legwidths = [0,55,135,235];
            var legsymbols = legend.selectAll(".legsymbols")
                .data(["0-500","500-5,000","5,000-50,000",">50,000"])
                .enter()
                .append("g")
                .attr("class","legsymbols")
                .attr("transform",function(d,i) {return "translate(" + (150 + legwidths[i]) + ",0)";})
            ;

            var legendspace = 5;

            legsymbols.append("circle")
                .attr("cx", function(d,i) {return rmax / ((-1)*((i+1) - 5)) ;})
                .attr("cy", function(d,i) {return (legendspace+2*rmax) - (rmax / ((-1)*((i+1) - 5))) ;})
                .style("fill", function(d,i) {
                        var gbval = 1+Math.floor(255 - (255/4*((i+1)-1)));
                        return "rgb(" + 255 + "," + gbval + "," + gbval + ")";
                    }
                )
                .style("stroke","black")
                .attr("r", function(d,i) {
                        return rmax / ((-1)*((i+1) - 5));
                    }
                )
            ;


            legsymbols.append("text")
                .attr("x", function(d,i) {return 5+2*rmax / ((-1)*((i+1) - 5)) ;})
                .attr("y", legendspace + 2*rmax)
                .style("text-anchor", "start")
                .text(function(d) { return d; });

            legend
                .append("text")
                .text("Wisconsin Employment:")
                .attr("y", rmax*2+ legendspace)
            ;

        });

    }
    //Render will return svg elemen(id="matrix_canvas") where vsiualization will be rendered. Added on 17-Oct-2018.
    render (){
        return (
            <div className="window side">
                <div className="window side">
                    <div className="sidenavbar">Matrix View</div>
                </div>
                <svg id="matrix_canvas" width="100%" height="100%"/>
            </div>

        );
    }



//mwchng1 ends
}
export default Matrix;