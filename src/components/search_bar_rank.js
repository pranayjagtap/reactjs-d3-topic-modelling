import React, {Component} from 'react';
import Popup from './popup'
import * as d3 from "d3-3";


//Global variables
var topics=[];
var topic_matrix=[];
var document_id="";
var topics_list=[];
var word="";
var term="";
class SearchBarRank extends Component{
    constructor(props){
        super(props);
        this.state = {
            term:'',
            showPopup: true,
            topic_list_map:[],
            rankflag:false

        };
        this.getTopics.bind(this)
        //get all files data
        topics=[];
        for(var i=0;i<50;i++) {
            topics.push(0);
        }
        topics.forEach(function(data,i){
            console.log(i)
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/topics_freq/topic_'+i+'.csv', function (text) { //Needs generalization ||d3 data ext call back starts
                var data = d3.csv.parseRows(text);
                topics[i]=data.toString();
                topic_matrix = data;

            }); //d3 call back ends


        });


    }







    componentDidMount(){
        topics=[];
        for(var i=0;i<50;i++) {
            topics.push(0);
        }
        topics.forEach(function(data,i){
            console.log(i)
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/topics_freq/topic_'+i+'.csv', function (text) { //Needs generalization ||d3 data ext call back starts
                var data = d3.csv.parseRows(text);
                topics[i]=data.toString();
                topic_matrix = data;

            }); //d3 call back ends


        });
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    componentWillReceiveProps(newProps){


        document_id=newProps.document_id;

    }

    storeWord(term){
        word=term;
        this.setState({term});
    }
    getTopics() {
        console.log(word)
        // term=word;
        var termcheck="";
        //Show hidden block when user starts typing


        //Set state call back starts
        this.setState({term},function(){

            termcheck=word;
            for(var i=0;i<50;i++){
                document.getElementById("topic_"+i).innerHTML="Topic"+i;
            }

            topics_list=[];
            topics.forEach(function (data, i) {
                if(data.indexOf(word)>-1){
                    topics_list.push("Topic_"+i)
                }

                var split;

                for(var i = 0 ; i < topics_list.length ; i++)
                {
                    var topic_no = topics_list[i].substr(topics_list[i].lastIndexOf("_")+1,topics_list[i].lastIndexOf("_")+2);
                    console.log(topic_no);
                    split = topics[topic_no].split(",");

                    if(split.indexOf(word)>=0) { //To avoid half words

                        var topicname = topics_list[i].toLowerCase();
                        var divHeight=(document.getElementById(topicname).style.height).replace("px","");
                        var x = d3.scale.linear()
                            .domain([split[1],split[split.length-1]])
                            .range([0,divHeight]);
                        var height = x(split[split.indexOf(word) + 1]);



                        var doc = document.getElementById(topicname);
                        doc.innerHTML = "";
                        var innerElement = document.createElement('div');
                        //document.getElementById(topics_list[i].toLowerCase())
                        innerElement.style.width = "14px"
                        innerElement.style.height = height + "px";
                        //innerElement.style.paddingLeft= "10px"
                        innerElement.style.borderBottom = "solid red"
                        innerElement.innerHTML=topicname;
                        doc.appendChild(innerElement)


                    }
                }
            });
            /*
             if(topic_matrix[i].indexOf(term))
                 if ((topic_matrix[i][0].valueOf().toLowerCase() === termcheck.toLowerCase()) &&(topic_matrix[i][3].length>0)) {
                     //Duplicity check
                     console.log(termcheck.toLowerCase())
                     console.log(topic_matrix[i][0].valueOf().toLowerCase())
                     if(!topics.includes(topic_matrix[i][3]))
                         topics.push(topic_matrix[i][3]); //Push topic name to array
                 }
         });
         */
            this.props.callbackParent(topics_list)
        });
    }


    render (){
        return (
            <div className="md-form active-cyan-2 mb-3">
                <div className="row">
                    <div className="col-lg-6">
                        <input  className="form-control col-lg-6" placeholder="Enter a word" aria-label="Search"
                                value={this.state.term}
                                onChange={event=>{this.storeWord(event.target.value);}} />
                    </div>
                    <div className="col-lg-4">
                        <button onClick={event=>{this.getTopics();}}>
                            Rank
                        </button>
                    </div>
                    <div className ="col-lg-4">

                    </div>
                </div>

            </div>
        );
    }
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);

    }
}

export default SearchBarRank;