import {Component} from "react";
import React from "react";
import * as d3 from "d3-3";
import  '../../style/style.css';
import  '../../style/serendip.css';
import {withFauxDOM} from 'react-faux-dom'


var document_id=""
var document_bkp=""
class TopicList extends Component {
    constructor(props) {
        super(props);
        var list_g = null;

        this.state = {
            document_id : props.document_id
        };
    }


    componentDidMount(){
        this.drawGraph(); //Call everytime
    }
    componentWillUnmount() {
        // Remember state for the next mount
        document_id = this.state.document_id;

    }

    componentWillReceiveProps(newProps) {
        console.log("new props in list topic", newProps);




        if(! newProps.document_id <= 0){

            this.setState({document_id: newProps.document_id}, //removed +1 for topic view issue
                function(){
                    document_id=this.state.document_id
                    document_bkp=this.state.document_id   //Save value in localMemory
                    this.drawGraph();


                });

        }
    }
    drawGraph(){

        //When document_id=0,and componentWillReceiveProps is not called, we pick value from previous run
        //This is required to retrieve bar graph when navigating from Document page to Home page
        document_id=document_bkp

        var curr=this;
        var data2 = {};
        console.log(this.props)

       // var el =  this.props.connectFauxDOM('div', 'List');
        //console.log(el)
        var el2=document.querySelector('div');
        var topic_count=[];
        d3.select('#topic_list').selectAll('div').remove();
        //We will pass path as a variable with file name according to topic selected by user

        d3.json('./Datamodel/Metadata/'+localStorage.getItem('dataset')+'/TopicModel/HTML/'+document_id+'/rules.json', function (data) {

            var json_data=data;
            for (var i in json_data) {
                topic_count.push([i, json_data[i].num_tags]);
            }

            topic_count.sort(function(a,b) {
                return b[1] - a[1];
            });



            var x = d3.scale.linear()
                .domain([0,300])
                .range([0,100]);


            //       console.log(el)
            //console.log(svg1)
            // el = new ReactFauxDOM.createElement('div')
            var svg1 = d3.select("#topic_list");
            var format = d3.format(".4f")



            var list_g=svg1
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

                    return x(d[1]) + "px";
                })
                .style("background", function (d, i) {
                    return i % 2 == 0 ? '#000' : "#444"
                })
                .style("margin", "2px")
                .style("border-radius", "0 10px 10px 0")
                .style("padding", "2px")
                .style("font-weight", 700)
                .style("font-size", "12px")
                .style("color", "white")
                .style("border", "1px solid black")
                .text(function (d) {

                    /*To avoid too many words with no width at the bottom*/
                    if (x(d[1]) > 1)
                        return d[0];
                })
                .style("font-weight", "bold");

            document_bkp=document_id  //store value in localMemory
        });

        this.forceUpdate();
    }




    render() {




        return (
            <div className="window side">
                <div className="sidenavbar">Topic  {document_id}

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



export default withFauxDOM(TopicList);
