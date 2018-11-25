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
import ReactFauxDom from 'react-faux-dom'
import {withFauxDOM} from 'react-faux-dom'

class TopicView extends Component {
    constructor(props) {
        super(props);
        var bar = null;

        console.log("in topic_view:", props);
        this.state = {
            topic_id : props.topic_view_id,
            topic_title: "Topic View",
            mean: -1,
            min: -1,
            max: -1
        };

    }
    componentDidMount(){
        console.log("did mount");
        this.draw_d3();
    };
    componentWillReceiveProps(newProps) {
        console.log("new props in topic_view", newProps);
        if(! newProps.topic_view_id <= 0){
            this.setState({topic_id: newProps.topic_view_id,topic_title: "topic_"+(newProps.topic_view_id/*+1*/)}, //removed +1 for topic view issue
               function(){
                   this.draw_d3();
            });

        }
    };

    draw_d3(){
        console.log("H")
        // var ele=this.plotBarGraph();
        //  var topic = document.querySelector('#topic_canvas');
        //console.log(topic)
        //topic.appendChild(el);
        // var curr=this;
        var data2 = {};
        // var el =  this.props.connectFauxDOM('div', 'chart');
        // var el2=document.querySelector('div');

        if(this.props.topic_view_id <= 0){
            console.log("empty text holder");
            d3.select('#topic_canvas').selectAll('div').data([0]).enter()
                .append("div")
                .style("width", "200px")
                .style("padding", "5px")
                .style("text-align","center")
                .style("font-size", "20px")
                .html("No topic selected");
        }else{
            console.log("calling remove");
            d3.select('#topic_canvas').selectAll('div').remove();
            var filepath = "./Datamodel/Metadata/"+localStorage.getItem('dataset')+"/TopicModel/topics_freq/topic_"+(this.props.topic_view_id-1)+".csv";
            //We will pass path as a variable with file name according to topic selected by user
            d3.text(filepath,  (data) => {
                data2 = d3.csv.parseRows(data);
                this.state.max = d3.max(data2, (a) => {
                    return a[1];
                });
                this.state.min = d3.min(data2, (a) => {
                    return a[1];
                });
                this.state.mean = d3.mean(data2, (a) => {
                    return a[1];
                });
                /*17-Oct-2018
                Keeping range from 0 to 100 sooutput will be percentile representation with highest freq word being 100
                * Domain stays between last data(minimum) to first data(max).
                * Data is in descending order of frequency
                * -Pranay
                * */
                var x = d3.scale.linear()
                    .domain([data2[data2.length - 1][1], data2[0][1]])
                    .range([0, 100]);
                //       console.log(el)
                //console.log(svg1)
                // el = new ReactFauxDOM.createElement('div')
                var svg1 = d3.select("#topic_canvas");
                var format = d3.format(".4f")

                var bar=svg1
                // .select(el)
                // console.log(svg)
                    .selectAll('div')
                    .data(data2)
                    .enter()
                    /* If you need text outside the bar
                     .append("text")
                     .text(function(d){
                         return d[0];
                     })
                     */
                    .append("div")
                    .filter(function(d) { return x(d[1]) > 10 })
                    .on('mouseover',  ()=> {
                        // color=

                        //curr.setState({"background": 'orange'});

                        /*d3.select(this)
                            .style("background", "orange")
                            .append('text')
                            .text(function (d) {
                                return '    =' + format(d[1])
                            });*/
                    })
                    .on("mouseout",  (d, i) =>{

                        //curr.setState({'background':i % 2 == 0 ? '#98d669' : "#77bb43"});
                        /* d3.select(this).style("background-color", function () {
                             return i % 2 == 0 ? '#98d669' : "#77bb43";
                         }).select("text").remove();
                         ;*/
                    })
                    .style("width", function (d) {
                        return 0.9*x(d[1]) + "%";
                    })
                    .style("background", function (d, i) {
                        return i % 2 == 0 ? '#a0a0a0' : "#838383"
                    })
                    .style("margin", "2px")
                    .style("border-radius", "0 10px 10px 0")
                    .style("padding", "2px")
                    .style("font-weight", 700)
                    .style("font-size", "12px")
                    .style("color", "white")
                    .style("border", "1px solid black")
                    .text(function (d) {
                        return d[0];
                    })


            });
        }
        this.forceUpdate();
    }
        /*Added div instead of svg on 20-Oct-2018. SVG didn't render div tags so letting it cascade inside parent div.
         * Also added enabled overflow in serendip.css file for sideworkspace
         * -Pranay
         * */

        showtopics() {
            document.getElementById("topic_canvas").style.display = "block";
            document.getElementById("topic_stats").style.display = "none";
        }
        showstats() {
            document.getElementById("topic_canvas").style.display = "none";
            document.getElementById("topic_stats").style.display = "block";
        }
        render() {
            console.log("Pranay")
            return (
                <div className="window side">
                    <div className="sidenavbar">{this.state.topic_title}
                        <div className="sidebtnctrl">
                            <div className="sidebtns" onClick={this.showtopics}>Topics</div>
                            <div className="sidebtns" onClick={this.showstats}>Stats</div>
                        </div>
                    </div>

                    <div className="sideworkspace">
                        <div className="row">
                            <div style={{width:"90%", padding: "5px", margin:"0px 15px"}}>
                                <div id="topic_canvas" width="100%" height="100%">
                                    {
                                        this.props.chart
                                    }
                                </div>
                                <div id="topic_stats" style={{display: "none"}}>
                                    Topic Mean: {this.state.mean}<br/>
                                    Topic Max: {this.state.max}<br/>
                                    Topic Min: {this.state.min}<br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );

        }

    }


    //tvchng1 ends


    export default withFauxDOM(TopicView);