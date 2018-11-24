    import React from "react";
    import {Component} from "react";
    import  '../../style/style.css';
    import  '../../style/serendip.css';
    import * as d3 from "d3-3";

    var tag_words=[];
    var document_txt="No Document Selected";
    let document_id="";
    let oldProps=[];
    let flagForTopic=true;
    class TextReader extends Component {
        constructor(props) {
            super(props);

            this.state = {
                document_id : props.document_view_id,
                tag_words:[],
                text:[]
            };
            tag_words=props.tags;
            //This pushes document_id received from Home page to Document page
            //If all components of home page are also components of Home then you may comment this
            if(props.screen==="document") {
                props.handleTopicListChange(document_id);
                flagForTopic=false;  //flag to make sure dynamichighlighter does not run when we update document id
            }
        }


        componentWillUnmount() {
            // Remember state for the next mount
            document_id = this.state.document_id;
            oldProps=this.props;
            flagForTopic=flagForTopic;
        }

        componentWillReceiveProps(nextProps) {

            if(nextProps.screen==="home")
            if(! nextProps.document_view_id <= 0){

                this.setState({document_id: nextProps.document_view_id}, //removed +1 for topic view issue
                    function(){


                        document_id=nextProps.document_view_id;

                        document_txt=this.fetchFile(nextProps.document_view_id); //Update new document to the component
                        console.log(document)
                        this.forceUpdate();
                    });

            }
            console.log(this.state)
            console.log(this.nextProps)

            if(nextProps.screen==="document") {

                this.setState({
                    tags: nextProps.tags
                });


                /*nextProps.handleTopicListChange(document_id);*/
                tag_words = nextProps.tags;

                console.log("Child 2: I got invoked by Parent");
                console.log("Child 2: Data I received was:");
                document_txt=this.fetchFile(document_id);
                console.log(nextProps.flagForTopic)
                if(nextProps.flagForTopic) {
                    this.DynamicHighlighter();

                }

            }
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

        //Previously in Document.js. Moving it to Textreader to make easier calls. Changed by Pranay on 19-Nov-2018
        fetchFile=(dataFromChild) => {
            var docs="";
            var rawFile = new XMLHttpRequest();

            rawFile.open("GET", '../Datamodel/Corpora/Shakespeare/'+dataFromChild+'.txt', false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        docs=allText;
                    }
                }
            }
            rawFile.send(null);
            return docs;
        }


        //This function has the core business logic for text tagging
        DynamicHighlighter(){

            let tags=tag_words;
            let density=tag_words;

            var text=document_txt.split("\n").toString();
            var x = d3.scale.linear()
                .domain([tags[tags.length - 1][1], tags[0][1]])
                .range([0, 1]);

            for(var i=0;i<tags.length;i++) {
                if(x(density[i][1])*10>0.5) {  //This means only top words with density better than 0.5 will be displayed. Remove this if all are to be displayed but be prepared for slowness.
                    console.log("hello")
                    var docText = document.querySelector('#TextBox');
                    //Regex for word search
                    var regex = new RegExp('(\\s' + tags[i][0] + '\\s)', 'ig');
                    console.log(x(density[i][1]))
                    //Replace word with highlighted version of the word along with set opacity
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
                            document_txt.split("\n").toString()
                        }
                    </div>
                </div>
            );
        }
    }

    export default TextReader;