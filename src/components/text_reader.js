import React from "react";
import {Component} from "react";
import Highlighter from "react-highlight-words";
import styles from '../../style/serendip.css'
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
                <Highlighter
                    activeClassName={styles.Active}
                    highlightClassName={styles.Highlight}
                    activeIndex={2}
                    searchWords={["and", "or", "the"]}
                    highlightStyle={{ fontWeight: 'bold' }}

                    autoEscape={false}
                    textToHighlight={this.props.txt.split("\n").toString()}


                />

            </div>
        );
    }
}

export default TextReader;