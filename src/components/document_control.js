import {Component} from "react";
import React from "react";


class DocumentControl extends Component{
    constructor(props){
        super(props);

        this.state={term:''};

    }
    render (){
        return (

            <div className="window side">
                <div className="sidenavbar">Document Controls</div>
                <div>
                    <div className="control">
                    Labelling by MetaData
                    </div>
                    <div className="control">
                    Sorting
                    </div>
                    <div className="control">
                    Selection
                    </div>
                    <div className="control">
                    Coloring by MetaData
                    </div>
                </div>
            </div>

        );
    }




}
export default DocumentControl;