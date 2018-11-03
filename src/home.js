import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import DocumentControl from './components/document_control';
import Controls from './components/controls';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//stylesheet
import  '../style/serendip.css';


const m5 = {
    margin: '5px'
};

const nopad = {
    padding: '0px'
};

const title = {
    fontWeight: '700',
    margin: '0px 15px',
};

class Home extends Component {
    constructor(props){
        super(props);
        console.log("Hello1")
    }
    onClick(){
        //Your code to add user to the lst of users
        BrowserRouter.push("/Document");
    }
    render() {
        return (
            <div>

                <div  className="navbar">
                    <span style={title}>Serendip</span>

                    <select>
                        <option value="0">Select model</option>
                    </select>
                </div>


                <div style={m5}>
                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <Controls />
                        </div>
                        <div style={m5}>
                            <DocumentControl />
                        </div>
                    </div>
                    <div style={m5}>
                        <div style={nopad} className="col-lg-8">
                            <div style={m5}>
                                <Matrix />
                            </div>
                        </div>
                    </div>

                    <div style={nopad} className="col-lg-2">
                        <div style={m5}>
                            <TopicView />
                        </div>
                        <div style={m5}>
                            <Router>
                                <div>
                                    <Link to="/Document">Document</Link>
                                    <Route  path="/" component={Home} />
                                    <Route exact path="/Document" component={Document} />

                                </div>
                            </Router>
                            <Link to="/Document">DocumentScreen</Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home;

