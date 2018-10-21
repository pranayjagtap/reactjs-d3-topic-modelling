import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import DocumentControl from './components/document_control';
import Controls from './components/controls';
import DocumentView from "./components/document_view";

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

export default class App extends Component {
	constructor(props){
		super(props);
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
                    <DocumentView />
                </div>
            </div>

        </div>
	</div>
    );
  }
}



ReactDOM.render(<App/>, document.querySelector('.serendipapp'));