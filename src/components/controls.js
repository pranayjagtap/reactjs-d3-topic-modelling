import {Component} from "react";
import React from "react";

//stylesheet
import  '../../style/serendip.css';

const sortcontrol = {
    height: '70px',
    borderBottom: 'solid 1px',
    display: 'none'
};

const selectioncontrol = {
    height: '100px',
    borderBottom: 'solid 1px',
};

const show = {
    display: "block"
};

const hide = {
    display: "none"
}

class Controls extends Component{
    constructor(props){
        super(props);
        this.state={term:''};
        this.state.sortcontrol = "none";
        this.state.selectioncontrol = hide;
        this.expandsort = this.expandsort.bind(this);
    };
    expandsort (){
        this.state.sortcontrol= "block";
    };
    render (){
        return (
            <div className="window side">
                <div className="sidenavbar">Topic Controls</div>
                <div>
                    <div className="control" onClick={this.expandsort}>
                    Sorting
                    </div>
                    <div id='sortcontrol' style={{display: this.state.sortcontrol}}>
                    </div>
                    <div className="control">
                    Selection
                    </div>
                    <div id='selectioncontrol' style={this.state.selectioncontrol}>
                    </div>
                </div>
            </div>

        );
    }




}
export default Controls;