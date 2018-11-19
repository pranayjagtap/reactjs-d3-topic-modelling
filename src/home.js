import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import DocumentControl from './components/document_control';
import Controls from './components/controls';

import RankView from './rank_view';



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
const screen="home";
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            doc_view_id: -1,
            topic_view_id: 0
        }
    };
    handleTopicChange = (topic_view_id) => {
        console.log(topic_view_id);
        this.setState({
            topic_view_id: topic_view_id
        });

    };
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
        };
        rawFile.send(null);
        return docs;
    }
    onClick(){
        //Your code to add user to the lst of users
        BrowserRouter.push("/Document");
    }
    render() {
        var docs=this.fetchFile();
        const {topic_view_id} = this.state;
        var {handleTopicChange} = this;
        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Serendip</span>

                    <select>
                    <option value="0">Select model</option>
                    </select>
                    <div className="sidebtnctrl">
                            <div className="sidebtns"><Link to="/Rank">RankViewer</Link></div>
                        </div>
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
                                <Matrix 
                                    handleTopicChange = {handleTopicChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <TopicView 
                                topic_view_id = {topic_view_id}
                            />
                        </div>
                        <div style={m5}>
                            <div className="window side">
                                <div className="sidenavbar"><Link to="/Document">Document</Link></div>


                            <div className="sideworkspace">

                                    <TextReader
                                        txt={docs}
                                        screen={screen}/>
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

