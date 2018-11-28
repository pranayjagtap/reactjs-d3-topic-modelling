import React, {Component} from 'react';
import { browserHistory } from 'react-router';


import {Router, BrowserRouter, Link} from 'react-router-dom';

import TopicList from  './components/topic_list_rotated';
import SearchBarRank from  './components/search_bar_rank';
import TopicView from './components/topic_view.1';
//stylesheet
import  '../style/serendip.css';
import * as d3 from "d3-3";
import SearchBar from "./components/search_bar";

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
var tag_word;
var topic_view_id="";
var curr = this;
var items = [];
export default class DocumentScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            tag_word_list:["p",0.5],
            tag_topic_sel: "",
            topic_view_id:0,
            items:[],
            tags:[],
            rankflag:false
       };
        curr=this;
    }


    fetchFile=(dataFromChild) => {
var docs="";
         var rawFile = new XMLHttpRequest();
         rawFile.open("GET", '../Data/1KINGHENRYIV.txt', false);
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

      handleTopicChange = (topic_view_id) => {

        this.setState({
            topic_view_id: topic_view_id

        });

    };
    fetchAndThrow=(topic_names)=>{


                curr.setState({topics:topic_names})
                console.log("Parent: State of item changed");

            }


           // console.log("p"+tag_word_list);

    render() {

       // document=this.fetchFile();

        /*var document=require("../Data/1KINGHENRYIV.csv");*/

        return (
            <div>

                <div  className="navbar">
                    <Link to="/"><span style={title}>Go to Corpus Viewer</span></Link>
                    <span style={title}>RankViewer</span>
                </div>

                <SearchBarRank className="col-lg-8"
                 callbackParent={this.fetchAndThrow}/>

<div className="row">
                <div style={m5}>
                    <div style={nopad} className="col-lg-8">
                        <div style={m5}>
                            <TopicList
                                callbackFromParent={this.handleTopicChange}
                                topics={this.state.topics}
                                 />
                        </div>
                        </div>
                    </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            {
                                this.state.topic_view_id.length>1?
                                <TopicView
                                    topic_view_id={this.state.topic_view_id}

                                />:null
                            }
                        </div>
                        </div>

                    </div>
</div>
                </div>



        );
    }
}



