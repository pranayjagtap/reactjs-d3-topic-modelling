import {Component} from "react";
import React from "react";


class Matrix extends Component{
    constructor(props){
        super(props);

        this.state={term:''};

    }
    render (){
        return (

            <div style={{backgroundColor: '#F8F8F8',borderRadius: '15px'}}>
                <h3 align="center">This will be the matrix view</h3>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/>
            </div>

        );
    }




}
export default Matrix;