import {Component} from "react";
import React from "react";


class DocumentView extends Component{
    constructor(props){
        super(props);

        this.state={term:''};

    }
    render (){
        return (
            <div className="window side">
                <div className="sidenavbar">Document View
                <div className="sidebtnctrl">
                        <div className="sidebtns">a</div>
                        <div className="sidebtns">b</div>
                        <div className="sidebtns">c</div>
                    </div>
                </div>
                <div className="sideworkspace">
                No Document selected
                </div>
            </div>
        );
    }
}
export default DocumentView;