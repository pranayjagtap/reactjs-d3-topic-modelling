import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
/*import  '../../style/style.css';*/

class TopicView extends Component{
    constructor(props){
        super(props);

        this.state={term:''};

    }


    componentDidMount(){
        this.plotBarGraph();

    }

    plotBarGraph(){
        var data2={};

        d3.text('./Data/topic_0.csv', function (data) {
            data2 = d3.csv.parseRows(data);
            var sum=0;
            data2.forEach(function(d){
                d[0]=d[0];
                d[1]=+d[1];
                sum=sum+d[1];
                /*console.log(d[0]+d[1])*/
            });
            /*   data2.forEach(function(d){
                   d[1]=(d[1]/sum)*100;
                   d[1]=+d[1];

               });*/

            console.log(data2[0][1]);





            //Write D3 code for (Topic view) bar graph here
            //Vijay logic for Bar chart--18-Oct-2018
            var x = d3.scale.linear()
                .domain([data2[data2.length-1][1],data2[0][1]])
                .range([0, 100]);

            d3.select("#topic_canvas")
                .selectAll("div")
                .data(data2)
                .enter().append("div")
                .style("width", function(d) {

                    console.log(x(d[1]));
                    return x(d[1]) + "px"; })
                .style("background", function(d,i) {return i%2==0?'#98d669':"#77bb43"})

                .text(function(d) {

                    //  console.log(d[0])
                    return d[0]; });

        });

    }

    render (){
        return (

            <div style={{backgroundColor: '#F8F8F8',borderRadius: '15px'}}>
                <h3 align="center">Topic View</h3>
                <svg id="topic_canvas" height="500" style={{border:'solid 1px #eee',borderBottom:'solid 1px #ccc'}} />
            </div>

        );
    }




}
export default TopicView;