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
        this.sortcontrols = [{"key":-1, "value":"none"},{"key":1, "value":"min"},{"key":2, "value":"max"},{"key":2, "value":"mean"}]
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
                            <div className='selbtns'>a</div>
                            <div className='selbtns'>b</div>
                            <div className='selbtns'>c</div>
                            <div className='selbtns'>d</div>
                            <div className='selbtns'>e</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }




}
export default Controls;