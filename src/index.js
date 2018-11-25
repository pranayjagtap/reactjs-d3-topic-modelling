import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import Home from "./home";
import DocumentScreen from './document';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RankView from './rank_view';

export default class App extends Component {
    render() {
       
        return (

            <Router>
                <div>

                    <Route exact path="/" component={Home} />
                    <Route path="/Document" component={DocumentScreen} />
                    <Route path="/Rank" component={RankView} />

                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.serendipapp'));
