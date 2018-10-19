import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Matrix from './components/matrix_window';
import TopicView from './components/topic_view';
import DocumentControl from './components/document_control';
import Controls from './components/controls';
import DocumentView from "./components/document_view";


export default class App extends Component {
	constructor(props){
		super(props);


	}



  render() {

    return (
	<div>

		<div className="row">

			<div className="col-lg-3">
                <div className="row">
				    <Controls />
                </div>
                <hr/>
                <div className="row">
                    <DocumentControl />
                </div>
			</div>

            <div className="col-lg-6">
			    <Matrix />
            </div>

            <div className="col-lg-3">
                <div className="row">
                    <TopicView />
                </div>
                <hr/>
                <div className="row">
                    <DocumentView />
                </div>
            </div>

        </div>





	</div>
    );
  }
}



ReactDOM.render(<App />, document.querySelector('.container'));