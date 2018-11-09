import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import DocumentControl from './components/document_control';
import Controls from './components/controls';
import DocumentScreen from './document';



//stylesheet
import  '../style/serendip.css';
import {Router, BrowserRouter, Link, Route} from 'react-router-dom';
import TextReader from "./components/text_reader";

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

class Home extends Component {
    constructor(props){
        super(props);
        console.log("Hello1")
    }
    fetchFile(){
        var docs="";
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", '../Data/1KINGHENRYIV.txt', false);  //Make chnages for dynamically picking file
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    docs=allText;
                }
            }
        }
        rawFile.send(null);
        return docs;
    }
    onClick(){
        //Your code to add user to the lst of users
        BrowserRouter.push("/Document");
    }
    render() {
        var docs=this.fetchFile();
        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Serendip</span>

                    <select>
                    <option value="0">Select model</option>
                    </select>
                    </div>


                    <div style={m5}>
                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <Controls />
                        </div>
                        <div style={m5}>

                            <DocumentControl/>
                        </div>
                    </div>
                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">
                            <div style={m5}>
                                <Matrix />
                            </div>
                        </div>
                    </div>

                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <TopicView />
                        </div>
                        <div style={m5}>
                            <div className="window side">
                                <div className="sidenavbar"><Link to="/Document">Document</Link></div>


                            <div className="sideworkspace">

                                    <TextReader
                                        txt={docs}/>
                            </div>
                            </div>




                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;

