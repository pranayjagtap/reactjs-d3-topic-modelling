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

var topic_name="";
class TopicView extends Component {
    constructor(props) {
        super(props);
        var bar = null;

    }

    componentWillReceiveProps(newProps){
        console.log("HHHHHHHHHHHHHHHHHHH"+newProps.topic_view_id)
            topic_name=newProps.topic_view_id;  
            console.log("topic view"+topic_name)   
            this.forceUpdate(); 

    }



        /*Added div instead of svg on 20-Oct-2018. SVG didn't render div tags so letting it cascade inside parent div.
         * Also added enabled overflow in serendip.css file for sideworkspace
         * -Pranay
         * */


        render() {

            //console.log(e)
            // var ele=this.plotBarGraph();
            //  var topic = document.querySelector('#topic_canvas');
            //console.log(topic)
            //topic.appendChild(el);

            var curr=this;
            var data2 = {};
            var el =  this.props.connectFauxDOM('div', 'chart');
            var el2=document.querySelector('div');
console.log(topic_name)
            d3.select("#topic_canvas").selectAll("*").remove();
            //We will pass path as a variable with file name according to topic selected by user
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/topics_freq/'+topic_name+'.csv', function (data) {
                data2 = d3.csv.parseRows(data);

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
                    .on('mouseover',  ()=> {
                        // color=

                        curr.setState({"background": 'orange'});

                        /*d3.select(this)
                            .style("background", "orange")
                            .append('text')
                            .text(function (d) {
                                return '    =' + format(d[1])
                            });*/
                    })
                    .on("mouseout",  (d, i) =>{

                        curr.setState({'background':i % 2 == 0 ? '#98d669' : "#77bb43"});
                        /* d3.select(this).style("background-color", function () {
                             return i % 2 == 0 ? '#98d669' : "#77bb43";
                         }).select("text").remove();
                         ;*/
                    })
                    .style("width", function (d) {
                        return x(d[1]) + "px";
                    })
                    .style("background", function (d, i) {
                        return i % 2 == 0 ? '#98d669' : "#77bb43"
                    })
                   
                    .text(function (d) {

                        /*To avoid too many words with no width at the bottom*/
                        if (x(d[1]) > 1)
                            return d[0];
                    })
                    .style("font-weight", "bold");


            });

            //console.log(el.toReact())
            return (
                <div className="window" style={{width:208, height:400, paddingBottom:2, paddingTop:2, marginLeft:265, paddingLeft:2, paddingRight:2}} >
                <div className="sidenavbar">Topic View</div>
                    <div className="sideworkspace1" style={{height:350}}>
                        <div className="row">
                            <div className="col-lg-1"/>
                            <div className="col-lg-2">
                                <div id="topic_canvas" width="100%" height="100%">
                                    {
                                        this.props.chart
                                    }
                                </div>
                            </div>
                            <div className="col-lg-1"/>
                        </div>
                    </div>
                    </div>
           

            );

        }

    }

    //tvchng1 ends


    export default withFauxDOM(TopicView);