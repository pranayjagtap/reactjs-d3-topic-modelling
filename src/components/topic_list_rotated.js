import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import  '../../style/serendip.css';
import {withFauxDOM} from 'react-faux-dom'

var topics="";
class RankView extends Component {
    constructor(props) {
        super(props);
        var list_g = null;
    }

    componentWillReceiveProps(newProps){
        topics=newProps.topics;
        this.forceUpdate();
    }

    render() {

        var curr=this;
        var data2 = {};
        var el =  this.props.connectFauxDOM('div', 'rankList');
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

            //var svg1 = d3.select("#topic_canvas");
            //var format = d3.format(".4f")

            var list_g=d3.select(el);

                // console.log(svg)
                list_g.selectAll('div')
                .data(topic_count)
                .enter()
                /* If you need text outside the bar
                 .append("text")
                 .text(function(d){
                     return d[0];
                 })*/


                .append("div")
                .on('click',  (d)=> {

                    console.log("click")
                    var topic_name=(d[0].toString())
                    console.log("rank view :Callback to Parent with-->"+topic_name)


                    curr.props.callbackFromParent(topic_name);
                    console.log("Child 1: My work is done");
                })

                .style("height", function (d) {
                    console.log(x(d[1]))
                    return x(d[1]) + "px";
                })
                .style("width", 14)

                .style("background", function (d, i) {
                   
                        return i % 2 == 0 ? '#8B9FFC  ' : "#AEBCFC"
                })
                .style('position','absolute')
                .style("padding-left", "10px")
                .style('top', 0)
                .style('left',function(d,i){
                    return i * 20;
                })

                .text(function (d) {

                //    To avoid too many words with no width at the bottom
                    if (x(d[1]) > 1)
                        return d[0];
                })

                .style("font-weight", "bold")
                .style("writing-mode", "vertical-rl")
                .style("text-orientation", "sideways")
                .style("font-size", "8px")
                .style("padding-top", "2px");
        });


        return (
            
            <div className="window" style={{width:606, height:245, paddingLeft:2, paddingRight:2, paddingTop:2}}>
            <div className="sidenavbar">Topic List

</div>
                <div className="topic_rotated_workspace" style={{width:600, paddingTop:2}} >
                    <div className="row">

                        <div className="col-lg-2" style={{height: '550px'}}>
                            <div id="topic_list" width="100%" height="100%">
                                {
                                    this.props.rankList
                                }
                            </div>
                        </div>
                    </div>
                </div>
                </div>
       
        );

    }
}
RankView.defaultProps = {
    rankList: 'loading'
}
//tvchng1 ends


export default withFauxDOM(RankView);
