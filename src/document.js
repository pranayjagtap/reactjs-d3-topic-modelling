import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import DocumentControl from './components/document_control';
import Controls from './components/controls';
import {Router, BrowserRouter, Link} from 'react-router-dom';
import TopicList from  './components/topic_list';
//stylesheet
import  '../style/serendip.css';

const m5 = {
    margin: '5px'
};

const nopad = {
    padding: '0px'
};

const title = {
    fontWeight: '700',
    margin: '0px 15px',
};

export default class DocumentScreen extends Component {
    constructor(props){
        super(props);
    }
    onClick(){
        //Your code to add user to the lst of users
        BrowserRouter.push("/");
    }
    render() {
        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Dcoument View</span>


                </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <TopicList />
                        </div>

                    </div>
                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">
                            <div style={m5}>
                                <div className="window side">

                                    <div className="documentcanvas" style={{height: '550px'}}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                                line graph
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}



