import React from "react";
import {Component} from "react";
import  '../../style/style.css';
import  '../../style/serendip.css';
var tag_words=[];
class TextReader extends Component {
    constructor(props) {
        super(props);

        this.state = {
          tag_words:[]
        };


        tag_words=props.tags;


    }

    componentDidMount(props){



       // this.DynamicHighlighter()
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
        //console.log(tag_words)

        //console.log("DynamicHighligher")
        let tags=tag_words;
        let density=tag_words;
        //console.log(tags)
        var text=this.props.txt.split("\n").toString();

        for(var i=0;i<tags.length;i++) {
            var docText = document.querySelector('#TextBox');

            var regex = new RegExp('(\\s' + tags[i][0] + '\\s)', 'ig');
            text = text.replace(regex, '<span id="highlight" class="highlight" style="opacity:' + (density[i][1]*1000) + '">$1</span>');
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
        //console.log("Render of child2")
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