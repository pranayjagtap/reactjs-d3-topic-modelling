import React, {Component} from 'react';
import { browserHistory } from 'react-router';


import {Router, BrowserRouter, Link} from 'react-router-dom';

import TopicList from  './components/topic_list';
import TextReader from  './components/text_reader';
//stylesheet
import  '../style/serendip.css';

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

export default class DocumentScreen extends Component {

    constructor(props){
        super(props);



    }
    onClick(){
        //Your code to add user to the lst of users
        BrowserRouter.push("/");
    }

    fetchFile(){
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
    render() {

        document=this.fetchFile();

        /*var document=require("../Data/1KINGHENRYIV.csv");*/

        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Dcoument View</span>


                </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2" style={{height: '550px'}}>
                        <div style={m5}>
                            <TopicList />
                        </div>

                    </div>
                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">
                            <div style={m5}>
                                <div className="window side">

                                    <div className="documentcanvas" style={{height: '550px'}}>
                                       <TextReader
                                           txt={document}
                                        />
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



