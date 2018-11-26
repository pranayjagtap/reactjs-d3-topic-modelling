import {Component} from "react";
import React from "react";


class DocumentControl extends Component{
    constructor(props){
        super(props);

        this.state={
            metadiv: "none",
            sortdiv: "none",
            seldiv: "none"
        };
        this.togglemetadiv = this.togglemetadiv.bind(this);
        this.togglesortdiv = this.togglesortdiv.bind(this);
        this.toggleselectdiv = this.toggleselectdiv.bind(this);

        this.docchange = this.docchange.bind(this);
        this.docselection = this.docselection.bind(this);

        this.handleSortControl = props.handleSortControl;
    }

    togglemetadiv(){
        var status = "block";
        if(this.state.metadiv == "block"){
            status = "none"
        }
        this.setState({metadiv:status});
    };
    togglesortdiv(){
        var status = "block";
        if(this.state.sortdiv == "block"){
            status = "none"
        }
        this.setState({sortdiv:status});
    };
    toggleselectdiv(){
        var status = "block";
        if(this.state.seldiv == "block"){
            status = "none"
        }
        this.setState({seldiv:status});
    }

    docchange(evt){
        console.log("selected ", evt.target.value);
        let type = evt.target.value;
        this.handleSortControl({order: type});
    }

    docselection(type){
        console.log("clicked ", type);
        this.handleSortControl({selection: type});
    }

    render (){
        return (

            <div className="window side">
                <div className="sidenavbar">Document Controls</div>
                <div>
                    <div className="control" onClick={this.togglemetadiv}>
                    Labelling by MetaData
                    </div>
                    <div id="metadatadiv" style={{display: this.state.metadiv}}>
                        <select onChange={this.docchange}>
                            <option>Select Property</option>
                            <option value="file">File Name</option>
                            <option value="auto">Auto Generated Labels</option>
                            <option value="id">ID</option>
                        </select>
                    </div>
                    <div className="control" onClick={this.togglesortdiv}>
                    Sorting
                    </div>
                    <div id="docsortdiv" style={{display: this.state.sortdiv}}>
                        <select onChange={this.docchange}>
                            <option>None</option>
                            <option value="sortfile">File Name</option>
                            <option value="sortid">ID</option>
                        </select>
                    </div>
                    <div className="control"  onClick={this.toggleselectdiv}>
                    Selection
                    </div>
                    <div id='selectioncontrol' style={{display: this.state.seldiv}}>
                        <div id='selecteddocslist'>
                            <div>No Documents Selected</div>
                        </div>
                        <div id='selectionbuttonscontainer'>
                            <div className='selbtns' onClick={() => this.docselection("sortdoc")}>&lt;</div>
                            <div className='selbtns' onClick={() => this.docselection("movedoc")}>^</div>
                            <div className='selbtns' onClick={() => this.docselection("cleardoc")}>X</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }




}
export default DocumentControl;