import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Popup from './components/popup'


import {Router, BrowserRouter, Link} from 'react-router-dom';

import TopicList from  './components/topic_list';
import TextReader from  './components/text_reader';
import LineGraph from './components/line_graph';
import SearchBar from './components/search_bar';
//stylesheet
import  '../style/serendip.css';
import * as d3 from "d3-3";

const m5 = {
    margin: '5px'
};

var document="p";

const nopad = {
    padding: '0px'
};

const title = {
    fontWeight: '700',
    margin: '0px 15px',
};

const screen="document";
var tag_word;
var curr = this;
var items = [];
let state=1;
export default class DocumentScreen extends Component {

    constructor(props){
        state++
        super(props);

        this.state = {
            tag_word_list:["p",0.5],
            tag_topic_sel: "",
            items:[],
            tags:[],
            topicname: "",
            searchword:"",
            json_tokens:[],
            showPopup: false,
            popup:false,
            textreader:false,
            document_id:0,
            flagForTopic:true
       };
        console.log("Refresh hua:"+state)
        this.state=state;
        console.log(this.state)
        curr=this;
    }
    componentWillUnmount() {
        // Remember state for the next mount
        state = this.state;
    }

    togglePopup() {
        console.log("yes toggle works")
        this.setState({
            showPopup: !this.state.showPopup,
            childname:'popup'
        });
    }
    fetchFile=(dataFromChild) => {
var docs="";
         var rawFile = new XMLHttpRequest();
         rawFile.open("GET", '../Data/'+dataFromChild+'.txt', false);
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

    handleTopicListChange(dataFromChild){
        console.log("You got this far")
        curr.setState({document_id:dataFromChild,flagForTopic:false},function(){
            console.log("Document.js says: "+this.state.document_id)
            this.forceUpdate();
        });
    }

    getTags=(topic_name)=>{

        if(topic_name!=null){
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/topics_freq/'+topic_name+'.csv', function (text) {
                var data=d3.csv.parseRows(text);
                console.log("Parent: State of item changed");
                curr.setState({tags:data,topicname:topic_name,flagForTopic:true})
                console.log("Parent: State of item changed");

            });


           // console.log("p"+tag_word_list);
        }

    }
    render() {

       // document=this.fetchFile("1KINGHENRYIV");
        state=state+1;
        /*var document=require("../Data/1KINGHENRYIV.csv");*/

        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Document View</span>


                </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2" style={{height: '550px'}}>
                        <div style={m5}>
                            <TopicList
                                callbackFromParent={this.getTags}
                                document_id={this.state.document_id}

                            />
                        </div>

                    </div>

                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">

                            <SearchBar className="col-lg-8" callBackForTopic={this.getTopics} callbackFromParent={this.getTags} />





                            <div style={m5}>
                                <div className="window side">

                                    <div className="documentcanvas" style={{height: '550px'}}>
                                       <TextReader
                                           //txt={document}
                                           tags={this.state.tags}
                                           screen={screen}
                                           handleTopicListChange={this.handleTopicListChange}
                                           flagForTopic={this.state.flagForTopic}

                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>

{
                            <LineGraph

                                       topicname={this.state.topicname}
                                       document_id={this.state.document_id}
                            />
}


                        </div>

                    </div>

                </div>
            </div>
        );
    }
}



