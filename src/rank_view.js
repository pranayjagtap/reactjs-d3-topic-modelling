import React, {Component} from 'react';
import { browserHistory } from 'react-router';


import {Router, BrowserRouter, Link} from 'react-router-dom';

import TopicList from  './components/topic_list_rotated';
import TextReader from  './components/text_reader';
import TopicView from './components/topic_view.1';
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
var tag_word;
var curr = this;
var items = [];
export default class DocumentScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            tag_word_list:["p",0.5],
            tag_topic_sel: "",
            items:[],
            tags:[]
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

    getTags=(topic_name)=>{

        if(topic_name!=null){
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/topics_freq/'+topic_name+'.csv', function (text) {
                var data=d3.csv.parseRows(text);
                console.log("Parent: State of item changed");
                curr.setState({tags:data})
                console.log("Parent: State of item changed");

            });


           // console.log("p"+tag_word_list);
        }

    }
    render() {

        document=this.fetchFile();

        /*var document=require("../Data/1KINGHENRYIV.csv");*/

        return (
            <div>

                <div  className="navbar">
                    <span style={title}>RankViewer</span>
                </div>

                <form class = "search">
                    <input type="text" name="name" placeholder="Enter words separated by a space" style={{ width:"300px" }}/>
                    {" "}
                    <select style={{ height:"30px" }}> 
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                    </select>
                    {" "}
                    <input type="submit" value="Add" />
                </form>

                <div style={m5}>
                    <div style={nopad} className="col-lg-2" style={{height: '550px'}}>
                        <div style={m5}>
                            <TopicList
                                callbackFromParent={this.getTags}
                                 />
                        </div>
                    </div>
                
                <div style={m5}>
                    <div style={{float: "right", width:"500px", nopad}} className="col-lg-2">
                        <div style={m5}>
                        <TopicView />
                        </div>

        </div></div>

                </div>
            </div>
        );
    }
}



