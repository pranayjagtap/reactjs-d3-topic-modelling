import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import Home from "./home";
import DocumentScreen from './document';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
    render() {
       
        return (

            <Router>
                <div>
                    <Link to="/">Home</Link>
                    <Route exact path="/" component={Home} />
                    <Route path="/Document" component={DocumentScreen} />

                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.serendipapp'));
