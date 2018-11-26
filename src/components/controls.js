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
        this.change = this.change.bind(this);
        this.selection = this.selection.bind(this);
        this.sortcontrols = [{"key":"none", "value":"none"},{"key":"min", "value":"min"},{"key":"max", "value":"max"},{"key":"mean", "value":"mean"}];
        this.handleSortControl = props.handleSortControl;
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

    change(evt){
        console.log("selected ", evt.target.value);
        let type = evt.target.value;
        this.handleSortControl({order: type});
    }

    selection(type){
        console.log("clicked ", type);
        this.handleSortControl({selection: type});
    }
    render (){
        return (
            <div className="window side">
                <div className="sidenavbar">Topic Controls</div>
                <div>
                    <div className="control" onClick={this.togglesort}>
                    Sorting
                    </div>
                    <div id='sortcontrol' style={{display: this.state.sortcontrol}}>
                    <select style={{width: '150px'}} onChange={this.change}>
                        { this.sortcontrols.map(item => <option value={item.key}>{item.value}</option>) }
                    </select>
                    </div>
                    <div className="control" onClick={this.toggleselection}>
                    Selection
                    </div>
                    <div id='selectioncontrol' style={{display: this.state.selectioncontrol}}>
                        <div id='selectedtopicslist'>
                            <div>No columns Selected</div>
                        </div>
                        <div id='selectionbuttonscontainer'>
                            <div className='selbtns' onClick={() => this.selection("bringleft")}>&lt;</div>
                            <div className='selbtns' onClick={() => this.selection("sort")}>^</div>
                            <div className='selbtns' onClick={() => this.selection("clear")}>X</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }




}
export default Controls;