    import React, {Component} from 'react';
    import Popup from './popup'
    import * as d3 from "d3-3";


    //Global variables
    var topics=[];
    var topic_matrix=[];
    var document_id="";

    class SearchBar extends Component{
        constructor(props){
            super(props);
            this.state = {
                term:'',
                showPopup: true,
                topic_list_map:[]

            };
            this.getTopics.bind(this)
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

                d3.text('./Datamodel/Metadata/'+localStorage.getItem('dataset')+'/TopicModel/HTML/'+document_id+'/tokens.csv', function (text) { //Needs generalization ||d3 data ext call back starts
                    var data = d3.csv.parseRows(text);
                    topic_matrix = data;
                }); //d3 call back ends
                topics = [];

                termcheck=this.state.term.toLowerCase();

                //Loop through tokens and check if entered word exists in which topics according to tokens

                topic_matrix.forEach(function (term, i) {
                    //Check if term entered matches token and its reflected topic in tokens.csv is not empty
                if(topic_matrix[i].length>3)
                    if ((topic_matrix[i][0].valueOf().toLowerCase() === termcheck.toLowerCase()) &&(topic_matrix[i][3].length>0)) {
                        //Duplicity check
                        console.log(termcheck.toLowerCase())
                        console.log(topic_matrix[i][0].valueOf().toLowerCase())
                        if(!topics.includes(topic_matrix[i][3]))
                            topics.push(topic_matrix[i][3]); //Push topic name to array
                    }
                });

                this.forceUpdate()
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
                            <button  onClick={this.togglePopup.bind(this)}>{this.state.showPopup?"Hide":"Show"}</button>
                        </div>
                    </div>
                    {this.state.showPopup ?
                        <Popup
                            text={"Showing suggestions for: \n"+this.state.term}
                            list={topics}
                            callFromPop={this.props.callbackFromParent}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            );
        }
        onInputChange(term){
            this.setState({term});
            this.props.onSearchTermChange(term);

        }
    }

    export default SearchBar;