import React from "react";
import {Component} from "react";


import  '../../style/style.css';
import  '../../style/serendip.css';

class TextReader extends Component {
    constructor(props) {
        super(props);
        console.log("It is here"+props.txt)
        var mytext=props.txt;
        this.state = {
            text: ""
        };
    }

    componentDidMount() {


        console.log(this.props.mytext)
    }



    render() {
        return (
            <div>
                {this.props.txt.split("\n").map((item, key) => {
                    return <span key={key}>{item}<br /></span>;
                })}
            </div>
        );
    }
}

export default TextReader;