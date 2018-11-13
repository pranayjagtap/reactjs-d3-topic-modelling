import React, { Component } from 'react';
import LineChart from 'react-linechart';
import  '../../style/style.css';
import  '../../style/serendip.css';

var topic_name="";
class LineGraph extends Component {
    constructor(props){
        super(props);

        this.state = [
            {
                //id: 1,
                name: "topic1",
                color: "grey",
                points: [{x: 2, y: 1}, {x: 1, y: 3}, {x: 18, y: 7}]  //x=count of topic in that windowframe,y=500
            },
            {
                name: "topic2",
                color: "grey",
                points: [{x: 4, y: 1}, {x: 15, y: 5}, {x: 5, y: 7}]
            },
            {
                name: "topic3",
                color: "grey",
                points: [{x: 15, y: 1}, {x: 4, y: 5}, {x: 7, y: 7}]
            },
            {
                name: "topic4",
                color: "grey",
                points: [{x: 1, y: 1}, {x: 10, y: 6}, {x: 14, y: 7}]
            },
            {
                name: "topic5",
                color: "grey",
                points: [{x: 1, y: 1}, {x: 20, y: 7}, {x: 20, y: 7}]
            }
        ];

    }
    // onPointClick(event, point){
    //     console.log("here")
    // }
    //
    handlePointClick(event, point) {console.log("here");}

    componentWillReceiveProps(nextProps) {

        topic_name=nextProps.topicname;


        console.log("Child 3: I got invoked by Parent");
        console.log("Child 3: Data I received was:"+topic_name);

    }

    onPointClick(event, point){
        console.log("here");
    }





    // onPointHover={(obj) => `x: ${obj.x}<br />y: ${obj.y}`}

    render() {
        console.log(this.state)
        console.log("Smruti is mad")

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
                                                   for(var i = 0; i < this.state.length; i++) {
                                                       // console.log(data[i].points.length);
                                                       for(var j =0; j < this.state[i].points.length; j++) {
                                                           // console.log(data[i].points[j]);
                                                           if(point.x === this.state[i].points[j].x && point.y === this.state[i].points[j].y ){
                                                               this.state[i].color = "blue";
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

                                               data={this.state}



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


