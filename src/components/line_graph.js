import React, { Component } from 'react';
import LineChart from 'react-linechart';
import  '../../style/style.css';
import  '../../style/serendip.css';
import * as d3 from "d3-3";


//Global variables
var data_mat=[{name:"",color:"",points:[]}];  //Initializing Global variable as this will only be used in line_graph.js sono need for state
let counter=[];//=new Array(100).fill(0);
var topic_name="";
var points=[];

class LineGraph extends Component {
    data;
    constructor(props){
        super(props);
        //unused
        this.state = {
            data_line : [{
                name: "topic2",
                color: "grey",
                points: [{x: 4, y: 1}, {x: 15, y: 5}, {x: 5, y: 7}]

            }],
            topic_name : ""
        }

    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps) {

        topic_name=nextProps.topicname;


        console.log("Child 3: I got invoked by Parent");
        console.log("Child 3: Data I received was:"+topic_name);
        this.getPoints(topic_name)
    }

    getPoints(topic_name){
        var flag=true;
        var topic_matrix=[];
        var topics;
        var curr=this;
        if(topic_name.length>1)

        //State update is used to make sure render is called post completion
        //To ensure sequence is followed callback is used to handle async calls
            this.setState({topic_name},function() {
                d3.text('../Datamodel/Metadata/Shake_50/TopicModel/HTML/1KINGHENRYIV/tokens.csv', function (text) { //Needs to be generalized

                    var data = d3.csv.parseRows(text);
                    topic_matrix = data;
                    topics = [];
                    var j = 0;
                    var count = 0;
                    //Loop tokens
                    topic_matrix.forEach(function (term, i) {
                        //Window size =500, increment every 500 words. Store count in counter
                        if (i % 500 === 0) {

                            counter[j] = count;
                            count = 0;
                            j++;

                        }

                        counter[j] = 0;

                        //Checks if topic of the word is selected topic of the current event fired
                        if ((topic_matrix[i][3].valueOf() === topic_name)) {

                            count++;

                        }
                    }); //tokens loop ends

                    var k = 0;
                    //Create data structure points for easy creation of final data structure to be passed to LineGraph
                    counter.forEach(function (topic_name, i) {
                        points[i] = {x: counter[i], y: k};
                        k = k + 500;
                    });

                    //Input data to data_mat
                    data_mat[0].name = topic_name;
                    data_mat[0].color = "grey";
                    /* var jsonString = JSON.stringify(points);
                     data_mat.points= JSON.parse(jsonString);*/
                    data_mat[0].points = points;
                    // console.log(data_mat)

                    //Final forceUpdate since last render is not working. Needs better coding.
                    curr.forceUpdate();
                });//d3 data extraction call back ends
            });//setState call back ends
    }


    render() {

        return (


            <div className="window side">
                <div className="sidenavbar">Line Graph of {topic_name}

                </div>

                <div className="line_workspace">
                    <div className="row">

                        <div className="col-lg-2" style={{height: '550px',width:'300px'}}>
                            <div id="lineworkspace" width="100%" height="100%" style={{ opacity:'0.3'}}>

                                <LineChart id = "root"
                                    //hidePoints={true}
                                           width={250}
                                           height={600}
                                           xMax={20}
                                           hideXAxis={true}
                                           hideYAxis={true}
                                    //onPointHover={(obj) => `x: ${obj.x}<br />y: ${obj.y}`}
                                           onPointClick={(event, point)=> {
                                               // console.log(this.state);
                                               console.log(point);
                                               for(var i = 0; i < data_mat.length; i++) {
                                                   // console.log(data[i].points.length);
                                                   for(var j =0; j < data_mat.points.length; j++) {
                                                       // console.log(data[i].points[j]);
                                                       if(point.x === data_mat.points[j].x && point.y === data_mat.points[j].y ){
                                                           data_mat.color = "blue";
                                                           this.forceUpdate()

                                                       }

                                                   }
                                                   // if(data[i].name === "topic1"){
                                                   //     data[0].color = "blue";
                                                   // }
                                               }
                                               // console.log(this.state)
                                           }

                                           }

                                           data={data_mat}



                                />

                            </div>
                        </div>

                    </div>
                </div>
            </div>



            // <div className='lineworkspace' style={{ transform: `rotate(${90}deg)`, height: '550px', width: '200px', opacity:'0.3'}}>
            //
            // </div>
        );
    }
}

export default LineGraph;


