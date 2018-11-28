import React, {Component} from 'react';
import Document from '../document.js';
var topics=[];

class Popup extends React.Component {

    generateList(){
        console.log(this.props)
        var curr=this;
        console.log("Hi")
        var result_list=[]
           // result_list.push(<div class="button-box col-lg-12">)
        topics.forEach(function(data,i){

            result_list.push (<button type="button" className="btn btn-light" onClick={() =>curr.props.callFromPop(topics[i])}>{topics[i]}</button>)
            result_list.push("  ")
            //result_list.push(<br/>)
        });
        //result_list.push(</div>)
        return result_list;
    }
    render() {
        topics=this.props.list;
        console.log("Inside child-Popup:"+topics)
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <ul>{this.generateList()}</ul>
                </div>
            </div>
        );
    }
}

export default Popup;