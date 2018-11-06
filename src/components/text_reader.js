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


        this.DynamicHighlighter()
    }

    //override findChunks function in react-highlight-words

    findChunksAsWholeWord = ({
                                        autoEscape,
                                        caseSensitive,
                                        sanitize,
                                        searchWords,
                                        textToHighlight
                                    }) => {
        //Code skeletal taken from library react-highlight-word example

        const chunks = [];
        const textLow = textToHighlight.toLowerCase();
        //white spaces
        const sep = /[-\s]+/;

        const singleTextWords = textLow.split(sep);

        let fromIndex = 0;
        const singleTextWordsWithPos = singleTextWords.map(s => {
            const indexInWord = textLow.indexOf(s, fromIndex);
            fromIndex = indexInWord;
            return {

                word: s,
                index: indexInWord

            };
        });


        searchWords.forEach(sw => {
            const swLow = sw.toLowerCase();
            // Do it for every single text word
            singleTextWordsWithPos.forEach(s => {
                if (s.word.startsWith(swLow)) {
                    if(s.word.length===swLow.length){   //Added this line by Pranay in existing code sample to convert react-highlight-word functionality to only pick whole word matches

                        const start = s.index;
                        const end = s.index + swLow.length;

                        chunks.push({
                            start,
                            end
                        });
                    }
                }
            });


            if (textLow.startsWith(swLow)) {
                const start = 0;
                const end = swLow.length;
                chunks.push({
                    start,
                    end
                });
            }
        });

        return chunks;
    };

    DynamicHighlighter(){

        let tags=["and","or","the"];
        let density=[0.5,1,0.2];
        var text=this.props.txt.split("\n").toString();
        for(var i=0;i<tags.length;i++) {
            var docText = document.querySelector('#TextBox');

            var regex = new RegExp('(\\s' + tags[i] + '\\s)', 'ig');
            text = text.replace(regex, '<span id="highlight" class="highlight" style="opacity:' + density[i] + '">$1</span>');
            docText.innerHTML = text;
        }


       /* var inputText = document.getElementById("TextBox");
        var innerHTML = inputText.innerHTML;
        var index = innerHTML.indexOf("and");
        if (index >= 0) {
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+3) + "</span>" + innerHTML.substring(index + 3);
            inputText.innerHTML = innerHTML;
        }*/

       /* var searchwords=["and", "or", "the"];
        let tags=[];
        tags.push(<Highlighter activeClassName={styles.Active} highlightClassName={styles.Highlight}  searchWords={[searchwords[0]]} autoEscape={false}  activeIndex={2} textToHighlight={this.props.txt.split("\\n").toString()} findChunks={this.findChunksAsWholeWord} highlightStyle={{backgroundColor: 'orange',opacity:0.5}}  />);
        tags.push(<Highlighter activeClassName={styles.Active} highlightClassName={styles.Highlight}  searchWords={[searchwords[1]]} autoEscape={false}  activeIndex={2} textToHighlight={this.props.txt.split("\\n").toString()} findChunks={this.findChunksAsWholeWord} highlightStyle={{backgroundColor: 'green',opacity:0.5}}  />);
        console.log(tags)
        return tags;*/

    }
    render() {
// {this.DynamicHighlighter()}
        return (


            <div >
                <div id="TextBox">
                {
                    this.props.txt.split("\n").toString()

                }
                </div>



            </div>


        );
    }
}

export default TextReader;