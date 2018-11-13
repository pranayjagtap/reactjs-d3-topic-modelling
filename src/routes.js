
import DocumentScreen from './document';
import RankView from './rank_view';
import Home from './home';
import {Route} from "react-router-dom";
import React from "react";
import App from "./index";

const routes = (
    <Route exact path="/" component={App}>

        <Route path="Document" component={DocumentScreen}/>
        <Route path="Rank" component={RankView}/>
    </Route>
);

export default routes;