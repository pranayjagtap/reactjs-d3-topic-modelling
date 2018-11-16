import React, {Component} from 'react';
import reactDom from 'react-dom';
import Popup from './popup'
import * as d3 from "d3-3";

var word="";
var topics=[];
var topic_matrix=[];
var curr=this;
var flag=false;
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
    getTopics(term) {
        console.log("Current word   "+term)
        var termcheck="";

        if(!this.state.showPopup){
            this.togglePopup();
        }

        this.setState({term},function(){
            d3.text('./Datamodel/Metadata/Shake_50/TopicModel/HTML/1KINGHENRYIV/tokens.csv', function (text) {
                var data = d3.csv.parseRows(text);
                topic_matrix = data;
            });
            topics = [];

             termcheck=this.state.term;

            topic_matrix.forEach(function (term, i) {

                if ((topic_matrix[i][0].valueOf() === termcheck) &&(topic_matrix[i][3].length>0)) {
                    console.log("Inside")
                    if(!topics.includes(topic_matrix[i][3]))
                        topics.push(topic_matrix[i][3]);
                }
            });
            console.log(topics)
            console.log("yes toggle works")
            console.log(this.state.term)

            this.forceUpdate()
        });


       /* flag=true;
        this.togglePopup(term,flag);
        flag=false;*/
      //  console.log(this.state.term)






    }

    componentDidMount(){
        this.togglePopup("");

    }


    togglePopup(){



        this.setState({
            showPopup: !this.state.showPopup,

            childname:'popup'
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
              //  topic={}
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