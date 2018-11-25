import React, {Component} from 'react';
import Popup from './popup'
import * as d3 from "d3-3";


//Global variables
var topics=[];
var topic_matrix=[];
var document_id="";
var topics_list=[];

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
                console.log(topics)
            }); //d3 call back ends


        });


        }







    componentDidMount(){
        this.togglePopup("");
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    componentWillReceiveProps(newProps){


        document_id=newProps.document_id;

    }
    getTopics(term) {
        console.log(term)
        var termcheck="";
        //Show hidden block when user starts typing
        if(!this.state.showPopup){
            this.togglePopup();
        }

        //Set state call back starts
        this.setState({term},function(){

            termcheck=this.state.term.toLowerCase();


topics_list=[];
            topics.forEach(function (data, i) {
                if(data.indexOf(term)>-1){
                    topics_list.push("Topic_"+i)
                }
console.log(topics_list)
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
                                onChange={event=>{this.getTopics(event.target.value);}} />
                    </div>
                    <div className ="col-lg-4">
                        {topics_list}
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