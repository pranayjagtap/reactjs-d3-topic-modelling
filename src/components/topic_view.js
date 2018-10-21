/*
* Topic view contains bar graphs for topic frequencies.
* Change#1:
* Date: 20-Oct-2018
* Author: Pranay Jagtap
* Searchstring:"tvchng1"
* Finished rendering bar chart with annotations for a topic. Currently file selection is hardcoded.
*
*
*
*
*
* */


import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import  '../../style/serendip.css';

class TopicView extends Component{
    constructor(props){
        super(props);
    }



    componentDidMount(){
        this.plotBarGraph();

    }
//tvchng1 starts
    plotBarGraph(){
        var data2={};
        //We will pass path as a variable with file name according to topic selected by user
        d3.text('./Data/topic_0.csv', function (data) {
            data2 = d3.csv.parseRows(data);

            /*17-Oct-2018
            Keeping range from 0 to 100 sooutput will be percentile representation with highest freq word being 100
            * Domain stays between last data(minimum) to first data(max).
            * Data is in descending order of frequency
            * -Pranay
            * */
            var x = d3.scale.linear()
                .domain([data2[data2.length-1][1],data2[0][1]])
                .range([0, 100]);


            var svg = d3.select("#topic_canvas");
            var format = d3.format(".4f")
           svg
                .selectAll("div")
                .data(data2)
                .enter()
              /* If you need text outside the bar
               .append("text")
               .text(function(d){
                   return d[0];
               })
               */
               .append("div")
               .on("mouseover", function() {
                  // color=
                   d3.select(this)
                       .style("background-color", "orange")
                       .append('text')
                       .text(function (d) { return '    ='+format(d[1]) });
               })
               .on("mouseout", function(d, i) {
                   d3.select(this).style("background-color", function() {
                       return i%2==0?'#98d669':"#77bb43";
                   }).select("text").remove();;
               })
               .style("width", function(d) {
                    return x(d[1]) + "px"; })
                .style("background-color", function(d,i) {return i%2==0?'#98d669':"#77bb43"})
                .text(function(d) {
                    /*To avoid too many words with no width at the bottom*/
                    if(x(d[1])>1)
                        return d[0];
                })
               .style("font-weight","bold");




        });

    }
    /*Added div instead of svg on 20-Oct-2018. SVG didn't render div tags so letting it cascade inside parent div.
     * Also added enabled overflow in serendip.css file for sideworkspace
     * -Pranay
     * */


    render (){ 
        return (
            <div className="window side">
                <div className="sidenavbar">Topic View 
                    <div className="sidebtnctrl">
                        <div className="sidebtns">a</div>
                        <div className="sidebtns">b</div>
                        <div className="sidebtns">c</div>
                    </div>
                </div>

                <div className="sideworkspace">
                    <div className="row">
                        <div className="col-lg-1"/>
                        <div className="col-lg-2">
                            <div id="topic_canvas" width="100%" height="100%"/>
                        </div>
                        <div className="col-lg-1"/>
                    </div>
                </div>

            </div>
        );
    }
    //tvchng1 ends

}
export default TopicView;