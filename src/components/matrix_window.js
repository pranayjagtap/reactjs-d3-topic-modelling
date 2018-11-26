/*
* Matrix view contains bubble chart/matrix graph for topic vs document counts.
*/

import {Component} from "react";
import React from "react";
import  '../../style/style.css';
import '../../style/serendip.css';
import * as matrix_model from '../models/matrix_model.js'

class Matrix extends Component{
    constructor(props){
        super(props);
        this.model = "";
        this.state = {
            handleTopicChange: props.handleTopicChange,
            handleDocumentChange:props.handleDocumentChange,
            sort_controls: {
                order: "none",
                selection: []
            }
        }
    }

    componentDidMount(){
        this.model = matrix_model.render_matrix(this.state);
    }

    componentWillReceiveProps(newProps) {
        console.log("recieved new prop", newProps);
        this.setState({
            sort_control: newProps.sort_control
        });
        this.model.sort(newProps);
    }

    render (){
        return (
            <div className="window side">
                <div className="window side">
                    <div className="sidenavbar">Matrix View</div>
                </div>
                <div className="matrixcanvas" style={{height: '550px'}}>
                    <svg id="matrix_canvas" width="100%" height="100%"/>
                </div>
            </div>
        );
    }
}
export default Matrix;