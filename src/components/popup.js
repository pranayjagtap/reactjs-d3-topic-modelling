import React, {Component} from 'react';
var topics=[];
class Popup extends React.Component {

    generateList(){
        console.log("Hi")
        var result_list=[]
        topics.forEach(function(data,i){
            console.log(i)
           result_list.push (<li>{topics[i]}</li>);
        })
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