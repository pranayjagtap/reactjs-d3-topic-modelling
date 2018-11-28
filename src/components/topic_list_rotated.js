import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import  '../../style/serendip.css';
import {withFauxDOM} from 'react-faux-dom'

var topics2=[];
var topics="";
var curr=this;
var topic_matrix=[];
class RankView extends Component {
    constructor(props) {
        super(props);
        var list_g = null;

        for(var i=0;i<50;i++) {
            topics2.push(0);
        }
        topics2.forEach(function(data,j){

            d3.text('./Datamodel/Metadata/'+localStorage.getItem('dataset')+'/TopicModel/topics_freq/topic_'+j+'.csv', function (text) { //Needs generalization ||d3 data ext call back starts
                var data = d3.csv.parseRows(text);
                topics2[j]=data.toString();
                topic_matrix = data;

            }); //d3 call back ends


        });


    }

    componentDidMount(){

        for(var i=0;i<50;i++) {
            topics2.push(0);
        }
        topics2.forEach(function(data,i){

            d3.text('./Datamodel/Metadata/'+localStorage.getItem('dataset')+'/TopicModel/topics_freq/topic_'+i+'.csv', function (text) { //Needs generalization ||d3 data ext call back starts
                var data = d3.csv.parseRows(text);
                topics2[i]=data.toString();
                topic_matrix = data;

            }); //d3 call back ends


        });
        this.drawPlot();
        this.forceUpdate();
    }
    componentWillReceiveProps(newProps){
        topics=newProps.topics;
        this.drawPlot();

      //  this.forceUpdate();
    }


    drawPlot(){
        console.log("I got called")
        console.log(topics2)
        var curr=this;
        var data2 = {};
        var el =  this.props.connectFauxDOM('div', 'rankList');
        var el2=document.querySelector('div');
        var topic_count=[];



//C:\Users\admin\ReduxSimpleStarter\Datamodel\Metadata\Movie_review\TopicModel\HTML\0_0
        //We will pass path as a variable with file name according to topic selected by user
        d3.json('./Data/rules.json', function (data) {
            //d3.json('./Datamodel/Metadata/'+localStorage.getItem('dataset')+'TopicModel/HTML/'+document_id+'/rules.json'),function(data){

            /*var json_data=data;
            for (var i in json_data) {
                topic_count.push([i, json_data[i].num_tags]);
            }
            */
var topic_list=[];
           // console.log(topics)
            for(var i=0;i<50;i++){
                var split = topics2[i].split(",");
                topic_list[i]=["topic_"+i,split.length/2];
            }
          //  console.log(topic_list)


            topic_count=topic_list;
            console.log(topic_count)

            var x = d3.scale.linear()
                .domain([0,300])
                .range([0,100]);

            //       console.log(el)
            //console.log(svg1)
            // el = new ReactFauxDOM.createElement('div')

            var svg1 = d3.select("#topic_list");
            //var format = d3.format(".4f")

           // var list_g=d3.select(el);

            // console.log(svg)
           var list_g=svg1.selectAll('div')
                .data(topic_count)
                .enter()
                /* If you need text outside the bar
                 .append("text")
                 .text(function(d){
                     return d[0];
                 })*/


                .append("div")
                .on('click',  (d)=> {
console.log(d)
                    console.log("click")
                    var topic_name=(d[0].toString())
                    console.log("rank view :Callback to Parent with-->"+topic_name)


                    curr.props.callbackFromParent(topic_name);
                    console.log("Child 1: My work is done");
                })
                .attr("id", function(d, i) { return d[0] })
                .style("height", function (d) {
                    console.log("Y"+d[1])
                    return x(d[1]) + "px";
                })
                .style("width", "40px")

                .style("background", function (d, i) {

                    return i % 2 == 0 ? '#000' : "#444"
                })
               .style('left',function(d,i){
                   console.log()
                   return i * 50+"px";
               })
                .style('position','absolute')

               // .style("padding-left", "10px")
                .style('top', 0)
               //.style("margin", "2px")
               .style("border-radius", "0 10px 10px 0")
               //.style("padding", "2px")
               .style("font-weight", 700)
               .style("font-size", "12px")
               .style("color", "white")
               .style("border", "1px solid black")

                .text(function (d) {

                    //    To avoid too many words with no width at the bottom
                    if (x(d[1]) > 1) {
                        console.log(d[0])
                        return d[0];
                    }
                })

                .style("font-weight", "bold")
                .style("writing-mode", "vertical-rl")
                .style("text-orientation", "sideways")
                .style("font-size", "15px")
                .style("padding-top", "2px");
                curr.forceUpdate();
        });

        this.forceUpdate();

    }

    render() {



        return (
            
            <div className="window" style={{width:950, height:500, paddingLeft:2, paddingRight:2, paddingTop:2}}>
            <div className="sidenavbar">Topic List

</div>
                <div className="topic_rotated_workspace" style={{width:940,height:500, paddingTop:2}} >
                    <div className="row">

                        <div className="col-lg-2" style={{height: '950px'}}>
                            <div id="topic_list" width="100%" height="100%">
                                {
                                  //  this.props.rankList
                                }
                            </div>
                        </div>
                    </div>
                </div>
                </div>
       
        );

    }
}
/*
RankView.defaultProps = {
    rankList: 'loading'
}
//tvchng1 ends
*/


export default withFauxDOM(RankView);
