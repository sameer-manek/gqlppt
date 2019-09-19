import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

const gurujiStyle = {
    display: 'block',
    margin: '30px auto'
}

class User extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div style={{color: 'white'}}>
                <img src="static/guruji.jpg" style={gurujiStyle} />
                <h3 style={{textAlign: 'center'}}>Time is a circle</h3>
            </div>
        )
    }
}

export default User;