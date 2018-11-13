import React from "react";
import {Component} from "react";
import  '../../style/style.css';
import  '../../style/serendip.css';
import * as d3 from "d3-3";
var tag_words=[];
class TextReader extends Component {
    constructor(props) {
        super(props);

        this.state = {
          tag_words:[],
          text:[]
        };
        tag_words=props.tags;
    }

    componentDidMount(props){
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.tags
        });

        tag_words=nextProps.tags;
        console.log("Child 2: I got invoked by Parent");
        console.log("Child 2: Data I received was:");
        this.DynamicHighlighter();
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
        let tags=tag_words;
        let density=tag_words;

        var text=this.props.txt.split("\n").toString();
        var x = d3.scale.linear()
            .domain([tags[tags.length - 1][1], tags[0][1]])
            .range([0, 1]);

        for(var i=0;i<tags.length;i++) {
            if(x(density[i][1])*10>0.5) {
                console.log("hello")
                var docText = document.querySelector('#TextBox');

                var regex = new RegExp('(\\s' + tags[i][0] + '\\s)', 'ig');
                console.log(x(density[i][1]))
                text = text.replace(regex, '<span id="highlight" class="highlight" style="opacity:' + (x(density[i][1]))*10 + '">$1</span>');
                docText.innerHTML = text;
            }
        }

    }
    render() {

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