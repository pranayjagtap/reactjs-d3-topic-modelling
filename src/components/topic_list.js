import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import  '../../style/serendip.css';
import {withFauxDOM} from 'react-faux-dom'

class TopicList extends Component {
    constructor(props) {
        super(props);
        var list_g = null;
    }

    render() {

        var curr=this;
        var data2 = {};
        var el =  this.props.connectFauxDOM('div', 'List');
        var el2=document.querySelector('div');
        var topic_count=[];

            //We will pass path as a variable with file name according to topic selected by user
        d3.json('./Data/rules.json', function (data) {

        var json_data=data;
        for (var i in json_data) {
           topic_count.push([i, json_data[i].num_tags]);
       }



            var x = d3.scale.linear()
                .domain([0,300])
                .range([0,100]);


            //       console.log(el)
            //console.log(svg1)
            // el = new ReactFauxDOM.createElement('div')
            var svg1 = d3.select("#topic_canvas");
            var format = d3.format(".4f")

            var list_g=d3
                .select(el)
                // console.log(svg)
                .selectAll('div')
                .data(topic_count)
                .enter()
                /* If you need text outside the bar
                 .append("text")
                 .text(function(d){
                     return d[0];
                 })
                 */
                .append("div")
                .on('click',  (d)=> {

                    var topic_name=(d[0].toString())
                    console.log("Child 1 :Callback to Parent with-->"+topic_name)


                    curr.props.callbackFromParent(topic_name);
                    console.log("Child 1: My work is done");
                })

                .style("width", function (d) {
                    console.log(x(d[1]))
                    return x(d[1]) + "px";
                })
                .style("background", function (d, i) {
                    return i % 2 == 0 ? '#8B9FFC  ' : "#AEBCFC"
                })
                .text(function (d) {

                    /*To avoid too many words with no width at the bottom*/
                    if (x(d[1]) > 1)
                        return d[0];
                })
                .style("font-weight", "bold");


        });


        return (
            <div className="window side">
                <div className="sidenavbar">Topic List

                </div>

                <div className="topic_workspace">
                    <div className="row">

                        <div className="col-lg-2" style={{height: '550px'}}>
                            <div id="topic_list" width="100%" height="100%">
                                {
                                    this.props.List
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
TopicList.defaultProps = {
    List: 'loading'
}
//tvchng1 ends


export default withFauxDOM(TopicList);
