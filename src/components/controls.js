import {Component} from "react";
import React from "react";

//stylesheet
import  '../../style/serendip.css';

class Controls extends Component{
    constructor(props){
        super(props);
        this.state={term:''};
        this.state.sortcontrol = "none";
        this.state.selectioncontrol = "none";
        this.togglesort = this.togglesort.bind(this);
        this.toggleselection = this.toggleselection.bind(this);
    };
    togglesort (){
        var status = "block";
        if(this.state.sortcontrol == "block"){
            status = "none"
        }
        this.setState({sortcontrol:status});
    };

    toggleselection (){
        var status = "block";
        if(this.state.selectioncontrol == "block"){
            status = "none"
        }
        this.setState({selectioncontrol:status});
    };
    render (){
        return (
            <div className="window side">
                <div className="sidenavbar">Topic Controls</div>
                <div>
                    <div className="control" onClick={this.togglesort}>
                    Sorting
                    </div>
                    <div id='sortcontrol' style={{display: this.state.sortcontrol}}>
                    <select style={{width: '150px'}}>

                    </select>
                    </div>
                    <div className="control" onClick={this.toggleselection}>
                    Selection
                    </div>
                    <div id='selectioncontrol' style={{display: this.state.selectioncontrol}}>
                    </div>
                </div>
            </div>

        );
    }




}
export default Controls;