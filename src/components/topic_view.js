import {Component} from "react";
import React from "react";


class Controls extends Component{
    constructor(props){
        super(props);
    }
    render (){ 
        return (
            <div className="window side">
                <div className="sidenavbar">Topic View 
                    <div className="sidebtnctrl">
                        <div className="sidebtns">a</div>
                        <div className="sidebtns">b</div>
                        <div className="sidebtns">c</div>
                    </div>
                </div>
                <div className="sideworkspace">
                No Topic Selected
                </div>
            </div>
        );
    }
}
export default Controls;