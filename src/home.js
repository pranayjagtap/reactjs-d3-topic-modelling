import React, {Component} from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import TopicList from './components/topic_list';
import DocumentControl from './components/document_control';
import Controls from './components/controls';

import RankView from './rank_view';



//stylesheet
import  '../style/serendip.css';
import {Router, BrowserRouter, Link, Route} from 'react-router-dom';
import TextReader from "./components/text_reader";
import * as d3 from "d3-3";

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
var initial_db="Shake_50";
class Home extends Component {


    constructor(props){
        super(props);
        if(localStorage.getItem('dataset') ===null){

            initial_db="Shake_50";
        }
        else
            initial_db=localStorage.getItem('dataset');

        this.state = {
            doc_view_id: -1,
            topic_view_id: 0,
            document_view_id:0,
            document_id:0,

            value:initial_db,

            sort_controls: "none"

        }
        this.changeValue = this.changeValue.bind(this);
    };
    handleTopicChange = (topic_view_id) => {
        console.log(topic_view_id);
        this.setState({
            topic_view_id: topic_view_id
        });

    };
    componentDidUnmount(){

    }
    //Added by Pranay on 19-Nov-2018 to allow users to select documents
    handleDocumentChange=(document_view_id)=>{
        console.log(document_view_id);
        this.setState({
            document_view_id: document_view_id,
            document_id:document_view_id
        });
    };

    handleSortControl = (sort_params) => {
        this.setState({
            sort_controls: sort_params
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

    changeValue(event){

        this.setState({value:event.target.value},function(){
        console.log("Got called")

            localStorage.setItem('dataset',document.getElementById('select_data').value);
            initial_db=localStorage.getItem('dataset');
            document.location.reload();


        });
    }



    render() {
        console.log("Finishing touches:"+this.state.value)
        var docs=this.fetchFile();
        const {topic_view_id} = this.state;
        const {document_view_id} = this.state;
        const {document_id} = this.state;
        const {sort_controls} = this.state;
        var {handleTopicChange} = this;
        var {handleDocumentChange} = this;
        var {handleSortControl} = this;
        return (
            <div>
                <div  className="navbar">

                    <span style={title}>Serendip</span>



                    <Link to="/"><span style={title}>Serendip</span></Link>
                    <select className="custom-select" id="select_data" onChange={this.changeValue} value={this.state.value}>
                        <option  value="Shake_50">Shakespeare</option>
                        <option value="Movie_review">Movie Reviews</option>
                        <option value="Songs">Song Lyrics</option>
                    </select>
                    <div className="sidebtnctrl">
                        <div className="sidebtns"><Link to="/Rank">RankViewer</Link></div>
                    </div>
                </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <Controls
                                handleSortControl = {handleSortControl}
                            />
                        </div>
                        <div style={m5}>

                            <DocumentControl/>
                        </div>
                    </div>
                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">
                            <div style={m5}>
                                <Matrix
                                    sort_controls = {sort_controls}
                                    handleTopicChange = {handleTopicChange}
                                    handleDocumentChange={handleDocumentChange}
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
                                    <Tabs
                                        defaultTab="one"
                                        onChange={(tabId) => { console.log(tabId) }}
                                    >
                                        <TabList>
                                            <Tab tabFor="one">Document</Tab>
                                            <Tab tabFor="two">Topic List</Tab>

                                        </TabList>
                                        <TabPanel tabId="one">

                                            <TextReader
                                                txt={docs}
                                                screen={screen}
                                                document_view_id={document_view_id}/>
                                        </TabPanel>
                                        <TabPanel tabId="two">
                                            <div>
                                            <TopicList

                                                document_id={document_id}/>
                                            </div>
                                        </TabPanel>

                                    </Tabs>
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

